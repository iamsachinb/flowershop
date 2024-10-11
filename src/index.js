import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App'; // Importing App to use routing
//import FlowerShop from './components/FlowerShop';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App /> {/* Render the App component which includes the routing */}
    </Provider>
);
