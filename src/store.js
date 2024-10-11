// src/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import flowerReducer from "./reducers/flowerReducer";
import currencyReducer from './reducers/currencyReducer'; // Ensure this file exists

const rootReducer = combineReducers({
    flower: flowerReducer,
    currency: currencyReducer, // Add currency reducer here
});

// Create the Redux store with middleware
const store = createStore(
    rootReducer,
    applyMiddleware(thunk) // Middleware for async actions
);

export default store;
