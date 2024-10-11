// src/reducers/flowerReducer.js

import {
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SELECT_DATE,
    SET_CURRENCY,
    FETCH_CURRENCY_RATES,
    FETCH_FLOWERS // Make sure this is included
} from '../actionTypes';

const initialState = {
    flowers: [
        { id: 1, name: 'Rose', price: 10, quantity: 0, inCart: false, image: 'rose.jpg' },
        { id: 2, name: 'Garland', price: 15, quantity: 0, inCart: false, image: 'garland.jpg' },
        { id: 3, name: 'Chrysanthemum', price: 20, quantity: 0, inCart: false, image: 'chrysanthemum.jpg' },
        { id: 4, name: 'Lotus', price: 25, quantity: 0, inCart: false, image: 'lotus.jpg' }
    ],
    selectedDate: new Date().toISOString().split('T')[0], // Default to today

    currencyRates: {},
    selectedCurrency: 'INR',
};

export const flowerReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_QUANTITY:
            return {
                ...state,
                flowers: state.flowers.map(flower =>
                    flower.id === action.payload ? { ...flower, quantity: flower.quantity + 1 } : flower
                ),
            };
        case DECREMENT_QUANTITY:
            return {
                ...state,
                flowers: state.flowers.map(flower =>
                    flower.id === action.payload && flower.quantity > 0
                        ? { ...flower, quantity: flower.quantity - 1 }
                        : flower
                ),
            };
        case ADD_TO_CART:
            return {
                ...state,
                flowers: state.flowers.map(flower =>
                    flower.id === action.payload ? { ...flower, inCart: true } : flower
                ),
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                flowers: state.flowers.map(flower =>
                    flower.id === action.payload ? { ...flower, inCart: false } : flower
                ),
            };
        case SELECT_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        case SET_CURRENCY:
            return {
                ...state,
                selectedCurrency: action.payload,
            };
        case FETCH_CURRENCY_RATES:
            return {
                ...state,
                currencyRates: action.payload,
            };
        case FETCH_FLOWERS: // Handle fetching flowers
            return {
                ...state,
                flowers: action.payload, // Update flowers from fetched data
            };
        default:
            return state; // Ensure the state is returned as is for unmatched actions
    }
};

export default flowerReducer;
