// actions/currencyActions.js
import axios from 'axios';

export const SET_CURRENCY_RATES = 'SET_CURRENCY_RATES';
export const SELECT_CURRENCY = 'SELECT_CURRENCY';

export const setCurrencyRates = (rates) => ({
    type: SET_CURRENCY_RATES,
    payload: rates,
});

export const selectCurrency = (currency) => ({
    type: SELECT_CURRENCY,
    payload: currency,
});

export const convertCurrency = (amount, currency) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`); // Example API endpoint
            const rates = response.data.rates;

            // Store the rates in the Redux store
            dispatch(setCurrencyRates(rates));

            // Convert the amount
            const convertedAmount = amount * rates[currency];
            return convertedAmount;
        } catch (error) {
            console.error("Error fetching currency rates:", error);
        }
    };
};
