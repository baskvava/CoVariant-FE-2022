import './App.css';
import React, {useState} from "react";
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer } from 'recharts';
import Button from 'react-bootstrap/Button';
import {
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Spinner,
  Tab,
  Toast,
  ToastContainer
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';
import { setCountries, setAllUsa } from "./actions";
import MapChart from './MapChart';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import ReactTooltip from "react-tooltip";

// const URL = "https://raw.githubusercontent.com/hodcroftlab/covariants/master/cluster_tables/USAClusters_data.json";
// const URL = "http://localhost:3001"
const URL = "https://covid-variant.herokuapp.com"

class App extends React.Component {

  color_set = {
    "Alpha": "#8884d8",
    "Beta": "#82ca9d",
    "Gamma": "#FF8D33",
    "Delta": "#15CFBE",
    "Eta": "#F950CF",
    "Kappa": "#187C33",
    "Iota": "#155972",
    "Lambda": "#232EE4",
    "Omicron": "#BFBF21",
    "others": "#B42DF8",
    // "non_variants": "#EA2323"
  }

  counties_regions_set = {
    "New England": ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"],
    "Mid-Atlantic": ["New Jersey", "New York", "Pennsylvania"],
    "East North Central": ["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin"],
    "West North Central": ["Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"],
    "South Atlantic": ["Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "Washington DC", "West Virginia"],
    "East South Central": ["Alabama", "Kentucky", "Mississippi", "Tennessee"],
    "West South Central": ["Texas", "Arkansas", "Louisiana", "Oklahoma"],
    "West Mountain": ["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming"],
    "West Pacific": ["Alaska", "California", "Hawaii", "Oregon", "Washington"],
  }

  constructor(props) {
    super(props);
    this.state = {
      content:"",
    }
  }

  componentDidMount() {
    fetch(`${URL}/getStates`)
      .then(res => res.json())
      .then(res => {
        this.props.setCountries(res);
      })

    fetch(`${URL}/getAllUsa`)
      .then(res => res.json())
      .then(res => {
        this.props.setAllUsa(res);
      })
  }

  oneArea(name) {
    let fill = "url(#" + name + ")"
    return (
        <Area type="monotone" dataKey={name} stroke={this.color_set[name]} fillOpacity={1} fill={fill}/>
    )
  }

  oneLinearGradient(name) {
    return (
        <>
          <linearGradient id={name} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.color_set[name]} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.color_set[name]} stopOpacity={0}/>
          </linearGradient>
        </>
    )
  }


  onePlot(thisdata, ID) {
    return (
        <>
          <div className="out-side">
            <div className="frame">
              <div id={ID} style={{width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ResponsiveContainer width='80%' height={500}>
                  <AreaChart width={1200} height={450} data={thisdata}
                             margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <Legend verticalAlign="top" height={72} iconType={"square"} width={"100%"}/>
                    <defs>
                      {/*<linearGradient id="Alpha" x1="0" y1="0" x2="0" y2="1">*/}
                      {/*  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>*/}
                      {/*  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>*/}
                      {/*</linearGradient>*/}
                      {(Object.keys(this.color_set)).map((virus) => (
                          this.oneLinearGradient(virus)
                      ))}
                    </defs>
                    <XAxis dataKey="week"/>
                    {/*<XAxis dataKey="week">*/}
                    {/*  <Label value="Date" offset={0} position="insideBottom" />*/}
                    {/*</XAxis>*/}
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    {/*<Area type="monotone" dataKey="Alpha" stroke="#8884d8" fillOpacity={1} fill="url(#Alpha)" />*/}
                    {(Object.keys(this.color_set)).map((virus) => (
                        this.oneArea(virus)
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
    )
  }


  oneNav(county) {
    return (
        <Nav.Item>
          <Nav.Link eventKey={county} style={{cursor:'pointer'}}>{county}</Nav.Link>
        </Nav.Item>
    )
  }


  oneTabPane(county) {
    if( this.props.countries.length > 0 ){
      const res = this.props.countries[0].filter(country => { 
        return country.county === county
      })
      return (
          <Tab.Pane eventKey={county}>
            <Container>
              <Row style={ {display: 'flex', 'justify-content': 'flex-end', 'align-items': 'flex-start'} }>
                <Col xs lg="3" style={{  "display": "flex", "justify-content": "flex-end"}} >
                  <Nav.Link href={ `${URL}/getState/${county}` } target="_blank"><Button variant="outline-primary" size="lg">Raw Data</Button>{' '}</Nav.Link>
                </Col>
                <Col xs lg="3">
                  <Nav.Link href={ `${URL}/getStateDetail/${county}` } target="_blank"><Button variant="outline-primary" size="lg">Unstacked Data</Button>{' '}</Nav.Link>
                </Col>
              </Row>
            </Container>
            {this.onePlot(res, {county})}
          </Tab.Pane>
      )
    }else{
     return(
         <Tab.Pane eventKey={county}>
          <div style={{width: '100%'}}>
            <Spinner style={{display: 'flex', margin: 'auto'}} animation="border" />
          </div>
           {/* <Spinner style={{"textAlign": "center"}} animation="border" /> */}
         </Tab.Pane>
     )
    }
  }


  eachCounty(region) {
    return (
        <Tab.Container id={region} defaultActiveKey={this.counties_regions_set[region].at(0)}>
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <strong>{region}</strong>
                {(this.counties_regions_set[region]).map((county) => (
                    this.oneNav(county)
                ))}
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {(this.counties_regions_set[region]).map((county) => (
                    this.oneTabPane(county)
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    )
  }


  eachRegion(region, indx) {
    const sty = indx % 2 ? {"paddingTop": "40px", "paddingBottom": "40px", "background": "whitesmoke"}
        : {"paddingTop": "40px", "paddingBottom": "40px"}

    return (
        <Container id={region} style={sty} fluid>
          {this.eachCounty(region)}
        </Container>
    )

  }

  callingAll(){
    if(this.props.allUsa.length > 0){
      return( this.onePlot(this.props.allUsa, "ALL_USA") )
    }else{
      return(
        <div style={{width: '100%'}}>
          <Spinner style={{display: 'flex', margin: 'auto'}} animation="border" />
        </div>
      )
    }
  }

  openAPI(){
    return(
        <div style={{background: "lightgrey", "padding": "3rem 1rem"}} id="API">
          <h2 style={{"textAlign": "center", "paddingTop": "30px"}} id="USA">- Data API- </h2>
          <SwaggerUI url="https://app.swaggerhub.com/apis-docs/sp22-variant-display/Variant_API/1.0.0-oas3" />
        </div>
    )
  }

  render() {

    return (
        <>
          <div style={{position: 'fixed', width: '100%', zIndex: '1000'}}>
            <Navbar bg="primary" variant="dark" >
              <Container>
                <Navbar.Brand href="#">Covid Variants in United States</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#USA">All</Nav.Link>
                  <NavDropdown title="View by Regions" id="regions">
                    <NavDropdown.Item href="#New England">New England</NavDropdown.Item>
                    <NavDropdown.Item href="#Mid-Atlantic">Mid-Atlantic</NavDropdown.Item>
                    <NavDropdown.Item href="#East North Central">East North Central</NavDropdown.Item>
                    <NavDropdown.Item href="#West North Central">West North Central</NavDropdown.Item>
                    <NavDropdown.Item href="#South Atlantic">South Atlantic</NavDropdown.Item>
                    <NavDropdown.Item href="#East South Central">East South Central</NavDropdown.Item>
                    <NavDropdown.Item href="#West South Central">West South Central</NavDropdown.Item>
                    <NavDropdown.Item href="#West Mountain">West Mountain</NavDropdown.Item>
                    <NavDropdown.Item href="#West Pacific">West Pacific</NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link href="https://usa-variant-zz85.surge.sh/" target="_blank">Vew Details</Nav.Link> */}
                  <Nav.Link href="https://github.com/hodcroftlab/covariants" target="_blank">Data Sources</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Item>
                    <Nav.Link href="#API"><Button variant="warning">Data API</Button>{' '}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Container>
            </Navbar>
          </div>

          <ToastContainer className="p-3" position="bottom-end">
            <Toast>
              <Toast.Header>
                <img src="../public/Rice_Shield_Black.png" className="Rice Logo" alt="Rice Shield " />
                <strong className="me-auto">Data comes from</strong>
                <small>updated</small>
              </Toast.Header>
              <Toast.Body><a href="https://github.com/hodcroftlab/covariants">Institute of Social and Preventive Medicine University of Bern</a>,
                Bern, Switzerland & SIB Swiss Insitute of Bioinformatics, Switzerland</Toast.Body>
            </Toast>
          </ToastContainer>

          <div style={{paddingTop: '50px'}}></div>
          <Container style={{"background": "white"}} fluid>
              <div style={{padding: '0rem 8rem 3rem 8rem'}}>
                <MapChart />
              </div>
          </Container>

          <Container style={{"background": "whitesmoke", "padding-bottom": "20px"}} fluid>
            <ReactTooltip>{this.props.toolTipContent}</ReactTooltip>
            <h2 style={{"textAlign": "center", "paddingTop": "30px"}} id="USA">- Whole USA- </h2>

            <Row style={ {display: 'flex', 'justify-content': 'center', 'align-items': 'flex-start'} }>
              <Col xs lg="3" style={{  "display": "flex", "justify-content": "flex-end"}} >
                <Nav.Link href={ `${URL}/getAllUsa` } target="_blank"><Button variant="outline-primary" size="lg">Get AllUsa</Button>{' '}</Nav.Link>
              </Col>
              <Col xs lg="3">
                <Nav.Link href={ `${URL}/getStatesDetail` } target="_blank"><Button variant="outline-primary" size="lg">Get Detail Data</Button>{' '}</Nav.Link>
              </Col>
            </Row>

            {this.callingAll()}
          </Container>
          <div id="regions">
            {
              Object.keys(this.counties_regions_set).map((region, idx) => (
                  this.eachRegion(region, idx)
              ))}
          </div>

          {/*API Document*/}
          {this.openAPI()}

          {/*Footer*/}
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Overview of Variants in United States</Card.Title>
              <Card.Text>
                <strong>Class</strong>:2021 COMP/ELEC 425/554 + 2022 COMP 590 Computer Systems Architecture, Ray Simar
                <br/>
                {/* <strong>Team</strong>: Hope-Simpson, #1.10 - How might we display variants? */}
                <br/>
                <strong>Author</strong>:
                <a href={"https://github.com/baskvava"}>Ying-Hsuan Chen</a> (yc144@rice.edu),
                <a href={"https://github.com/QuenLo"}>Cyuan-Heng Luo</a> (cl144@rice.edu),
                <br/>
                <a href="">Yuxi Liang, </a>
                <a href="">Serena Chen, </a>
                <a href="">Zewen Xu, </a>
                <a href="">Jiacheng Sun, </a>
                <a href="">Mengying Xie </a>
                <br/>
                <strong>Thanks To</strong>: Emma B. Hodcroft. 2021. "CoVariants: SARS-CoV-2 Mutations and Variants of
                Interest." <a href={"https://covariants.org/"}>https://covariants.org/</a>
              </Card.Text>
              <Button variant="primary" href={"https://github.com/baskvava/CoVariant-BE-2022"}>CoVariants (Github) - Backend</Button>
              <Button variant="primary" style={{marginLeft: '1.5rem'}} href={"https://github.com/baskvava/CoVariant-FE-2022"}>CoVariants (Github) - Frontend</Button>
            </Card.Body>
            <Card.Footer className="text-muted">@2022 Rice Comp 554 Hope-Simpson</Card.Footer>
          </Card>
        </>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    allUsa: state.allUsa,
    toolTipContent: state.toolTipContent
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCountries: (countries) => dispatch(setCountries(countries)),
    setAllUsa: (allUsa) => dispatch(setAllUsa(allUsa)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);