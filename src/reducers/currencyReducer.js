import { SET_CURRENCY_RATES, SELECT_CURRENCY } from '../actions/currencyActions';

const initialState = {
    rates: {},
    selectedCurrency: 'INR',
};

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCY_RATES:
            return {
                ...state,
                rates: action.payload,
            };
        case SELECT_CURRENCY:
            return {
                ...state,
                selectedCurrency: action.payload,
            };
        default:
            return state;
    }
};

export default currencyReducer;
