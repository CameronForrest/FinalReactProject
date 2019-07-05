import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';


import reducer from './store/reducer/reucer';
const composeEnhance=compose;
const store=createStore(reducer,composeEnhance(
    applyMiddleware(thunk)
));

const app=(<Provider store={store}><App/></Provider>)


ReactDOM.render(app, document.getElementById('root'));