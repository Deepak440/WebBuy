import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// To use redux devtool
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userProfileUpadteReducer } from "./reducers/userReducers";
import {productlistReducer , productDetailsReducer}  from './reducers/productReducers';
import {cartReducer} from './reducers/cardReducer';

// TO combine multiple reducer

const reducer = combineReducers({
    productList : productlistReducer,
    productDetails : productDetailsReducer,
   cart : cartReducer,
   userLogin: userLoginReducer ,
   userRegister : userRegisterReducer,
   userDetails : userDetailsReducer,
   userProfileUpadte : userProfileUpadteReducer,

   
  });

  
  // Parse the string into the js object
  // If not found in the local storage than assign the empty array
  const cartItmemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  
  const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;  
    
const initialState = {
  cart : {cartItems: cartItmemsFromStorage},
  userLogin :{userInfo : userInfoFromStorage }
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
