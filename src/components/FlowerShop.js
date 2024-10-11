import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style.css';
import { selectCurrency, setCurrencyRates, convertCurrency } from '../actions/currencyActions'; // Ensure these actions are correctly imported

// Images
import roseImage from '../images/rose.jpg';
import garlandImage from '../images/white_petal_garland1.jpg';
import chrysanthemumImage from '../images/white_chrys.jpg';
import lotusImage from '../images/lotus.jpg';

class FlowerShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught in FlowerShop:", error, info);
    }

    componentDidMount() {
        this.fetchCurrencyRates(); // Call the function here
    }

    fetchCurrencyRates = async () => {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Ensure this URL is correct
            const data = await response.json();
            
            console.log("Fetched currency rates:", data); // Log fetched data

            // Ensure you have the rates and they're in the correct format
            if (data && data.rates) {
                this.props.actions.setCurrencyRates(data.rates); // Use the action to set currency rates
            } else {
                console.error("Invalid data format:", data);
            }
        } catch (error) {
            console.error('Error fetching currency rates:', error);
        }
    };

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong!</h1>;
        }

        const { flowers, selectedDate, currencyRates, selectedCurrency, actions } = this.props;

        // Default flowers if none exist in props
        const defaultFlowers = [
            { id: 1, name: 'Rose', price: 10, quantity: 0, inCart: false },
            { id: 2, name: 'Garland', price: 15, quantity: 0, inCart: false },
            { id: 3, name: 'Chrysanthemum', price: 20, quantity: 0, inCart: false },
            { id: 4, name: 'Lotus', price: 25, quantity: 0, inCart: false }
        ];

        // Ensure flowers array is populated
        const safeFlowers = Array.isArray(flowers) && flowers.length > 0 ? flowers : defaultFlowers;

        // Calculate total cost of flowers in cart
        const totalCost = safeFlowers
            .filter(flower => flower.inCart)
            .reduce((acc, flower) => acc + (flower.price * flower.quantity), 0);

        // Convert cost based on selected currency
        const convertedCost = selectedCurrency && currencyRates[selectedCurrency]
            ? (totalCost * currencyRates[selectedCurrency]).toFixed(2)
            : totalCost.toFixed(2);

        return (
            <div className="shop-container">
                <header className="shop-header">
                    <h1 className="shop-name">A.M.K.A Flower Shop</h1>
                </header>

                <h2>Total Cost: ₹{totalCost.toFixed(2)} (Converted: {selectedCurrency} {convertedCost})</h2>
                
                <div className="currency-selector">
                    <label htmlFor="currency">Select Currency:</label>
                    <select 
                        id="currency" 
                        value={selectedCurrency} 
                        onChange={(e) => actions.selectCurrency(e.target.value)}
                    >
                        {Object.keys(currencyRates).map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>

                <div className="date-selector">
                    <label htmlFor="order-date">Select Date:</label>
                    <input 
                        type="date" 
                        id="order-date" 
                        value={selectedDate} 
                        onChange={(e) => actions.selectDate(e.target.value)}
                    />
                </div>

                <div className="flower-cards">
                    {safeFlowers.map(flower => (
                        <div key={flower.id} className="flower-card">
                            <img 
                                src={this.getFlowerImage(flower.name)} 
                                alt={flower.name} 
                                className="flower-image" 
                            />
                            <h2>{flower.name}</h2>
                            <p>Price: ₹{flower.price}</p>
                            <div className="quantity-control">
                                <button 
                                    onClick={() => actions.decrementQuantity(flower.id)}
                                    disabled={flower.quantity === 0} 
                                >
                                    -
                                </button>
                                <span>{flower.quantity}</span>
                                <button onClick={() => actions.incrementQuantity(flower.id)}>+</button>
                            </div>
                            <p>Total: ₹{(flower.price * flower.quantity).toFixed(2)}</p>
                            <div className="cart-buttons">
                                <button 
                                    className="add-to-cart" 
                                    onClick={() => actions.addToCart(flower.id)} 
                                    disabled={flower.inCart || flower.quantity === 0}
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    className="remove-from-cart" 
                                    onClick={() => actions.removeFromCart(flower.id)} 
                                    disabled={!flower.inCart}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    getFlowerImage(name) {
        switch (name) {
            case 'Rose':
                return roseImage;
            case 'Garland':
                return garlandImage;
            case 'Chrysanthemum':
                return chrysanthemumImage;
            case 'Lotus':
                return lotusImage;
            default:
                return ''; 
        }
    }
}

FlowerShop.propTypes = {
    flowers: PropTypes.array.isRequired,
    selectedDate: PropTypes.string.isRequired,
    currencyRates: PropTypes.object.isRequired,
    selectedCurrency: PropTypes.string.isRequired,
    actions: PropTypes.shape({
        setCurrencyRates: PropTypes.func.isRequired, // Add this line to specify setCurrencyRates
        fetchCurrencyRates: PropTypes.func.isRequired,
        selectDate: PropTypes.func.isRequired,
        selectCurrency: PropTypes.func.isRequired,
        incrementQuantity: PropTypes.func.isRequired,
        decrementQuantity: PropTypes.func.isRequired,
        addToCart: PropTypes.func.isRequired,
        removeFromCart: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = (state) => {
    console.log("Current state:", state); // Log the state to debug

    return {
        flowers: state.flower?.flowers || [],
        selectedDate: state.flower?.selectedDate || new Date().toISOString().split('T')[0],
        currencyRates: state.flower?.currencyRates || {},
        selectedCurrency: state.flower?.selectedCurrency || 'USD',
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: {
        setCurrencyRates: (rates) => dispatch({ type: 'SET_CURRENCY_RATES', payload: rates }), // Make sure this action is defined
        fetchCurrencyRates: () => dispatch(fetchCurrencyRates()), // Fetch currency rates
        selectDate: (date) => dispatch({ type: 'SELECT_DATE', payload: date }),
        selectCurrency: (currency) => dispatch(selectCurrency(currency)), // Update selected currency
        incrementQuantity: (id) => dispatch({ type: 'INCREMENT_QUANTITY', payload: id }),
        decrementQuantity: (id) => dispatch({ type: 'DECREMENT_QUANTITY', payload: id }),
        addToCart: (id) => dispatch({ type: 'ADD_TO_CART', payload: id }),
        removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowerShop);
