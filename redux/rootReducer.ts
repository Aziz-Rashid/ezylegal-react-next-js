import { combineReducers } from 'redux';

import cartReducer from './cart/cart.reducer';
import currencyReducer from './currency/currency.reducer';
import taxReducer from './tax/tax.reducer';
import loggedInUserReducer from './loggedInUser/loggedInUser.reducer';
import currentOrderReducer from './currentOrder/currentOrder.reducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    tax: taxReducer,
    currency: currencyReducer,
    loggedInUser: loggedInUserReducer,
    currentOrders: currentOrderReducer,
});

export default rootReducer;
