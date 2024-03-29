import axios from 'axios';
import {CARD_ADD_ITEM, CARD_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_PAYEMENT_METHOD} from '../constants/cartConstants';


export const addToCart = (id, qty) => async (dispatch , getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    
    // all the data items we require to diplay in the cart screen
    dispatch({
        type : CARD_ADD_ITEM,
        payload:{
            product : data._id,
            name : data.name,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    // Store this data in the localStorage
    // use getState to get the the cart 
    // Stringify because we can only store string in localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => (dispatch ,getState ) => {
    dispatch({
        type :  CARD_REMOVE_ITEM,
        payload : id
    });

    localStorage.setItem('cartItems' ,JSON.stringify(getState().cart.cartItems));

}

// Save shipping address
export const saveShippingAddress = (data) => (dispatch ) => {
    dispatch({
        type :  CART_SAVE_SHIPPING_ADDRESS,
        payload : data
    });

    localStorage.setItem('shippingAddress' ,JSON.stringify(data));

}

// Save payment method
export const savePaymentMethod = (data) => (dispatch ) => {
    dispatch({
        type :  CART_PAYEMENT_METHOD,
        payload : data
    });

    localStorage.setItem('paymentMethod' ,JSON.stringify(data));

}