export const GETDATA = "GETDATA";
export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_ALL_USA = "SET_ALL_USA";

export function getdata(ALL_JSON) {
    return {type: GETDATA, ALL_JSON}
}

export function setCountries(countries) {
    //console.log(countries)
    return {type: SET_COUNTRIES, countries}
}

export function setAllUsa(allUsa) {
    //console.log(countries)
    return {type: SET_ALL_USA, allUsa}
}