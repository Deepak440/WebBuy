import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// To use redux devtool
import { composeWithDevTools } from "redux-devtools-extension";

import {productlistReducer , productDetailsReducer}  from './reducers/productReducers';
import {cartReducer} from './reducers/cardReducer';

// TO combine multiple reducer

const reducer = combineReducers({
    productList : productlistReducer,
    productDetails : productDetailsReducer,
   cart : cartReducer
  });

  
  // Parse the string into the js object
  // If not found in the local storage than assign the empty array
  const cartItmemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];   
    
const initialState = {
  cart : {cartItems: cartItmemsFromStorage}
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
