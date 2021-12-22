import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// To use redux devtool
import { composeWithDevTools } from "redux-devtools-extension";

import {productlistReducer , productDetailsReducer}  from './reducers/productReducers';

// TO combine multiple reducer

const reducer = combineReducers({
    productList : productlistReducer,
    productDetails : productDetailsReducer
  
  });
    
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
