import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { scaleQuantile } from "d3-scale";
import { useDispatch, useSelector } from 'react-redux';
import { setTooltipContent } from "./actions";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = () => {
  const dispatch = useDispatch()
  const [weeks, setWeeks] = useState([])
  const [states, setStates] = useState([])
  const [allVirus, setAllVirus] = useState([])
  const [curTime, setCurTime] = useState()
  const [curVirus, setCurVirus] = useState("Options")
  const [curMap, setCurMap] = useState([])
  const [maxCount, setMaxCount] = useState(0)
  // const [myCar, setMyCar] = useState("Volvo");
  const countries = useSelector((state) => state.countries)
  const weekOptions = useSelector((state) => state.weekOptions)
  const stateOptions = useSelector((state) => state.stateOptions)
  const virusOptions = useSelector((state) => state.virusOptions)
  const mapFormat = useSelector((state) => state.mapFormat)

  useEffect(()=> {
    if (weeks.length === 0) {
      setWeeks(weekOptions)
      setCurTime(weekOptions[weekOptions.length-1])
    }

    if (states.length === 0) {
        const res = []
        for (const [key, value] of Object.entries(stateOptions)) {
          res.push({key, value})
        }
        setStates(res)
    }

    if (allVirus.length === 0) {
      setAllVirus(virusOptions)
    }

    if (curMap.length === 0) {
      setCurMap(mapFormat)
    }

  }, [weeks, weekOptions, states, stateOptions, allVirus, virusOptions, curMap, mapFormat])

  // virus
  const handleVirusChange = (event) => {
    const chosenVirus = event.target.value
    setCurVirus(chosenVirus)

    const allCountries = countries[0]

    const res = mapFormat.map((mapRow) => {
      mapRow['number'] = 0
      for (let data of allCountries) {
        if (stateOptions[mapRow.id] === data['county'] && data['week'] === curTime) {
          mapRow['number'] += isNaN(data[chosenVirus]) ? 0 : data[chosenVirus]
        }
      }
      return mapRow
    })
    let maxVal = 0
    res.forEach(element => {
      console.log(element.number)
      if (element.number > maxVal) {
        maxVal = element.number
      }
    })
    setMaxCount(maxVal)
    // console.log(res)
    setCurMap(res)
  }

  // time
  const handleTimeChange = (event) => {
    const chosenTime = event.target.value
    setCurTime(chosenTime)
    const allCountries = countries[0]
    const res = mapFormat.map((mapRow) => {
      mapRow['number'] = 0
      for (let data of allCountries) {
        if (stateOptions[mapRow.id] === data['county'] && data['week'] === chosenTime) {
          mapRow['number'] += isNaN(data[curVirus]) ? 0 : data[curVirus]
        }
      }
      return mapRow
    })
    let maxVal = 0
    res.forEach(element => {
      console.log(element.number)
      if (element.number > maxVal) {
        maxVal = element.number
      }
    })
    setMaxCount(maxVal)
    setCurMap(res)
  }

  const colorSets = [
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]

  const colorScale = scaleQuantile()
    .domain(curMap.map(d => d.number))
    .range(colorSets);

  const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
  };

  // console.log(stateOptions)

  return (
    <>
      <form style={{ display: 'flex', paddingTop: '2rem' }}>
        <label>
          Virus:
          <select value={curVirus} onChange={handleVirusChange}>
            {
              allVirus.length > 0 ? allVirus.map((virus) => {
                return (
                  <option key={virus} value={virus}>{virus}</option>
                )
              }) :  (<></>)
            }
          </select>
        </label>
        <label style={{ paddingLeft: '2rem' }}>
          Time:
          <select value={curTime} onChange={handleTimeChange}>
            {
              weeks.length > 0 ? weeks.map((weekOption) => {
                return (
                  <option key={weekOption} value={weekOption}>{weekOption}</option>
                )
              }) :  (<></>)
            }
          </select>
        </label>
        {maxCount !== 0 ? <label style={{ display: 'flex', paddingLeft: '2rem'}}>
          <span style={{ paddingRight: '0.75rem'}}>0</span>
          {colorSets.map(color => {
            return (
              <div key={color} style={{ width: '2rem', height: '2rem', background: `${color}`}}></div>
            )
          })}
          <span style={{ paddingLeft: '0.75rem'}}>{maxCount}</span>
        </label> : <></>}
      </form>
      <ComposableMap data-tip="" projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => {
                const cur = curMap.find(s => s.val === geo.id)
                return (<Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  onMouseEnter={() => {
                    if(cur) dispatch(setTooltipContent(`${cur.number}`));
                  }}
                  onMouseLeave={() => {
                    dispatch(setTooltipContent(""));
                  }}
                  fill={cur ? colorScale(cur.number) : "#EEE"}
                />)
              })}
              {geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = curMap.find(s => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={14} textAnchor="middle">
                            {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                        >
                          <text x={4} fontSize={14} alignmentBaseline="middle">
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default MapChart;