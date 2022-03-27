import './App.css';
import React  from 'react';
import { createStore} from "redux";
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import {userApp} from "./reducer";

// Components

// Pages
import NextApp from './nextApp';
import {Provider} from "react-redux";

const store = createStore( userApp )

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("state", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// store.subscribe(() => saveToLocalStorage(store.getState()));

// export default App;
export default function preApp() {
    return (
        <Provider store={ store }>
            <Router>
                <NextApp/>
            </Router>
        </Provider>
    );
}