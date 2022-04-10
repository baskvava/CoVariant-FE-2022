import './App.css';
import React  from 'react';
import { createStore} from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import {userApp} from "./reducer";

// Pages
import HomePage from './HomePage';
import {Provider} from "react-redux";

const store = createStore( userApp )

export default function preApp() {
    return (
        <Provider store={ store }>
            <Router>
                <HomePage/>
            </Router>
        </Provider>
    );
}