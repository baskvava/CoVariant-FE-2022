export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_ALL_USA = "SET_ALL_USA";

export function setCountries(countries) {
    return {type: SET_COUNTRIES, countries}
}

export function setAllUsa(allUsa) {
    return {type: SET_ALL_USA, allUsa}
}