// src/flowerActions.js

import {
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SELECT_DATE,
    SET_CURRENCY,
    FETCH_CURRENCY_RATES
} from './actionTypes';

// Action to increment the quantity of a flower
export const incrementQuantity = (flowerId) => ({
    type: INCREMENT_QUANTITY,
    payload: flowerId
});

// Action to decrement the quantity of a flower
export const decrementQuantity = (flowerId) => ({
    type: DECREMENT_QUANTITY,
    payload: flowerId
});

// Action to add a flower to the cart
export const addToCart = (flowerId) => ({
    type: ADD_TO_CART,
    payload: flowerId
});

// Action to remove a flower from the cart
export const removeFromCart = (flowerId) => ({
    type: REMOVE_FROM_CART,
    payload: flowerId
});

// Action to select a delivery date
export const selectDate = (date) => ({
    type: SELECT_DATE,
    payload: date
});

// Action to set the selected currency
export const setSelectedCurrency = (currency) => ({
    type: SET_CURRENCY,
    payload: currency
});

// Action to fetch currency conversion rates
export const fetchCurrencyConversion = () => {
    return (dispatch) => {
        fetch('https://api.exchangerate-api.com/v4/latest/INR')
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: FETCH_CURRENCY_RATES,
                    payload: data.conversion_rates
                });
            })
            .catch(error => {
                console.error('Error fetching currency data:', error);
            });
    };
};
