import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/bootstrap.css';
// import './bootstrap/bootstrap.js';
import 'animate.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux' ;
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>);
ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

