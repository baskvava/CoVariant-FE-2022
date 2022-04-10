import './App.css';
import React  from 'react';
import { createStore} from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import {userApp} from "./reducer";

// Pages
import NextApp from './nextApp';
import {Provider} from "react-redux";

const store = createStore( userApp )

export default function preApp() {
    return (
        <Provider store={ store }>
            <Router>
                <NextApp/>
            </Router>
        </Provider>
    );
}