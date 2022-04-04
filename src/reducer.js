import {
    SET_COUNTRIES,
    SET_ALL_USA,
    SET_TOOL_TIP_CONTENT,
} from "./actions";

const mapStates = {
    "AL": "Alabama",
	"AK": "Alaska",
	"AZ": "Arizona",
	"AR": "Arkansas",
	"CA": "California",
	"CO": "Colorado",
	"CT": "Connecticut",
	"DE": "Delaware",
	"FL": "Florida",
	"GA": "Georgia",
	"HI": "Hawaii",
	"ID": "Idaho",
	"IL": "Illinois",
	"IN": "Indiana",
	"IA": "Iowa",
	"KS": "Kansas",
	"KY": "Kentucky",
	"LA": "Louisiana",
	"ME": "Maine",
	"MD": "Maryland",
	"MA": "Massachusetts",
	"MI": "Michigan",
	"MN": "Minnesota",
	"MS": "Mississippi",
	"MO": "Missouri",
	"MT": "Montana",
	"NE": "Nebraska",
	"NV": "Nevada",
	"NH": "New Hampshire",
	"NJ": "New Jersey",
	"NM": "New Mexico",
	"NY": "New York",
	"NC": "North Carolina",
	"ND": "North Dakota",
	"OH": "Ohio",
	"OK": "Oklahoma",
	"OR": "Oregon",
	"PA": "Pennsylvania",
	"RI": "Rhode Island",
	"SC": "South Carolina",
	"SD": "South Dakota",
	"TN": "Tennessee",
	"TX": "Texas",
	"UT": "Utah",
	"VT": "Vermont",
	"VA": "Virginia",
	"WA": "Washington",
	"WV": "West Virginia",
	"WI": "Wisconsin",
	"WY": "Wyoming",
	// Territories
	"AS": "American Samoa",
	"DC": "District of Columbia",
	"FM": "Federated States of Micronesia",
	"GU": "Guam",
	"MH": "Marshall Islands",
	"MP": "Northern Mariana Islands",
	"PW": "Palau",
	"PR": "Puerto Rico",
	"VI": "Virgin Islands",
	// Armed Forces (AE includes Europe, Africa, Canada, and the Middle East)
	"AA": "Armed Forces Americas",
	"AE": "Armed Forces Europe",
	"AP": "Armed Forces Pacific",

}

const mapFormat = [
    { "id": "AL", "val": "01", "number": 0 },
    { "id": "AK", "val": "02", "number": 0 },
    { "id": "AS", "val": "60", "number": 0 },
    { "id": "AZ", "val": "04", "number": 0 },
    { "id": "AR", "val": "05", "number": 0 },
    { "id": "CA", "val": "06", "number": 0 },
    { "id": "CO", "val": "08", "number": 0 },
    { "id": "CT", "val": "09", "number": 0 },
    { "id": "DE", "val": "10", "number": 0 },
    { "id": "DC", "val": "11", "number": 0 },
    { "id": "FL", "val": "12", "number": 0 },
    { "id": "FM", "val": "64", "number": 0 },
    { "id": "GA", "val": "13", "number": 0 },
    { "id": "GU", "val": "66", "number": 0 },
    { "id": "HI", "val": "15", "number": 0 },
    { "id": "ID", "val": "16", "number": 0 },
    { "id": "IL", "val": "17", "number": 0 },
    { "id": "IN", "val": "18", "number": 0 },
    { "id": "IA", "val": "19", "number": 0 },
    { "id": "KS", "val": "20", "number": 0 },
    { "id": "KY", "val": "21", "number": 0 },
    { "id": "LA", "val": "22", "number": 0 },
    { "id": "ME", "val": "23", "number": 0 },
    { "id": "MH", "val": "68", "number": 0 },
    { "id": "MD", "val": "24", "number": 0 },
    { "id": "MA", "val": "25", "number": 0 },
    { "id": "MI", "val": "26", "number": 0 },
    { "id": "MN", "val": "27", "number": 0 },
    { "id": "MS", "val": "28", "number": 0 },
    { "id": "MO", "val": "29", "number": 0 },
    { "id": "MT", "val": "30", "number": 0 },
    { "id": "NE", "val": "31", "number": 0 },
    { "id": "NV", "val": "32", "number": 0 },
    { "id": "NH", "val": "33", "number": 0 },
    { "id": "NJ", "val": "34", "number": 0 },
    { "id": "NM", "val": "35", "number": 0 },
    { "id": "NY", "val": "36", "number": 0 },
    { "id": "NC", "val": "37", "number": 0 },
    { "id": "ND", "val": "38", "number": 0 },
    { "id": "MP", "val": "69", "number": 0 },
    { "id": "OH", "val": "39", "number": 0 },
    { "id": "OK", "val": "40", "number": 0 },
    { "id": "OR", "val": "41", "number": 0 },
    { "id": "PW", "val": "70", "number": 0 },
    { "id": "PA", "val": "42", "number": 0 },
    { "id": "PR", "val": "72", "number": 0 },
    { "id": "RI", "val": "44", "number": 0 },
    { "id": "SC", "val": "45", "number": 0 },
    { "id": "SD", "val": "46", "number": 0 },
    { "id": "TN", "val": "47", "number": 0 },
    { "id": "TX", "val": "48", "number": 0 },
    { "id": "UM", "val": "74", "number": 0 },
    { "id": "UT", "val": "49", "number": 0 },
    { "id": "VT", "val": "50", "number": 0 },
    { "id": "VA", "val": "51", "number": 0 },
    { "id": "VI", "val": "78", "number": 0 },
    { "id": "WA", "val": "53", "number": 0 },
    { "id": "WV", "val": "54", "number": 0 },
    { "id": "WI", "val": "55", "number": 0 },
    { "id": "WY", "val": "56", "number": 0 }
  ]


const allVirus = ["Alpha","Beta","Gamma","Omicron","Kappa","Eta","Iota","Lambda","others","Delta","non_variants"];

const initialState = {
    countries: [],
    allUsa:[],
    weekOptions: [],
    stateOptions: mapStates,
    virusOptions: allVirus,
    mapFormat: mapFormat,
    toolTipContent: ''
}


export function userApp( state= initialState, action ) {
    switch(action.type) {
        case SET_COUNTRIES:
            const allCountries = action.countries
            const weekOptions = new Set()
            for (let country of allCountries[0]) {
                weekOptions.add(country.week)
            }
            
            // console.log([...Object.values(mapStates)])

            return {
                ...state,
                weekOptions: Array.from(weekOptions),
                countries: action.countries
            }
        case SET_ALL_USA:
            return {
                ...state,
                allUsa: action.allUsa
            }
        case SET_TOOL_TIP_CONTENT:
            console.log(action.toolTipContent)
            return {
                ...state,
                toolTipContent: action.toolTipContent
            }
        default:
            return state;
    }
}