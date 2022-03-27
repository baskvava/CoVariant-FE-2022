export const GETDATA = "GETDATA";
export const SET_COUNTRIES = "SET_COUNTRIES";

export function getdata(ALL_JSON) {
    return {type: GETDATA, ALL_JSON}
}

export function setCountries(countries) {
    //console.log(countries)
    return {type: SET_COUNTRIES, countries}
}