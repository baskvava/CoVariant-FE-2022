import {
    SET_COUNTRIES,
    SET_ALL_USA,
} from "./actions";



const initialState = {
    countries: [],
    allUsa:[],
}

export function userApp( state= initialState, action ) {
    switch(action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.countries
            }
        case SET_ALL_USA:
            return {
                ...state,
                allUsa: action.allUsa
            }
        default:
            return state;
    }
}