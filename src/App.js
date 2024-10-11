// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import FlowerShop from './components/FlowerShop';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Define necessary routes */}
                    <Route path="/" element={<UserDetails />} />
                    <Route path="/flowershop" element={<FlowerShop />} />
                    <Route path="/other" element={<div>Other Page</div>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
