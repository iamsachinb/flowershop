// src/actions/index.js

import { FETCH_FLOWERS } from '../actionTypes';

export const fetchFlowers = () => {
    return async (dispatch) => {
        try {
            // Simulate fetching flowers data (replace with your actual API call)
            const flowersData = [
                { id: 1, name: 'Rose', price: 10, quantity: 0, inCart: false, image: 'rose.jpg' },
                { id: 2, name: 'Garland', price: 15, quantity: 0, inCart: false, image: 'garland.jpg' },
                { id: 3, name: 'Chrysanthemum', price: 20, quantity: 0, inCart: false, image: 'chrysanthemum.jpg' },
                { id: 4, name: 'Lotus', price: 25, quantity: 0, inCart: false, image: 'lotus.jpg' }
            ];
            dispatch({
                type: FETCH_FLOWERS,
                payload: flowersData,
            });
        } catch (error) {
            console.error('Error fetching flowers:', error);
        }
    };
};
