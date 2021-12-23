// Define all the reducer related to CART

import {CARD_ADD_ITEM , CARD_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems : []}, action) =>{
    switch(action.type){
         case CARD_ADD_ITEM :
             // if we click on the add to cart item if its already there
             const item = action.payload;
             
             const existItem = state.cartItems.find((x) => x.product === item.product);

             if(existItem){
                 // map through the array and replace the matching product item and leave the rest product items as it is
                return {
                    ...state,
                    cartItems : state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }

             }else{
                 // Item doses not exist in the cart => Push into the cart
                 return {
                     ...state ,
                     cartItems : [...state.cartItems , item]
                 }
             }

             case CARD_REMOVE_ITEM :
                 // Filter out the id == action.payload
                  return {
                      ...state,
                      cartItems : state.cartItems.filter((x) => x.product !== action.payload)
                  }

         default:
             return state

    }

};