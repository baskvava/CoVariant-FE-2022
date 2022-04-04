export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_ALL_USA = "SET_ALL_USA";
export const SET_TOOL_TIP_CONTENT = "SET_TOOL_TIP_CONTENT";

export function setCountries(countries) {
    return {type: SET_COUNTRIES, countries}
}

export function setAllUsa(allUsa) {
    return {type: SET_ALL_USA, allUsa}
}

export function setTooltipContent(toolTipContent) {
    return {type: SET_TOOL_TIP_CONTENT, toolTipContent}
}