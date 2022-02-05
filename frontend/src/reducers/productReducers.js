// Define all the reducer related to the products

import {
  PRODUCT_LISTREQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_Details_REQUEST,
  PRODUCT_Details_SUCCESS,
  PRODUCT_Details_FAILED,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_RESET,
} from "../constants/productConstant";

export const productlistReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LISTREQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_Details_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_Details_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_Details_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product : action.payload };

    case PRODUCT_CREATE_FAILED:
      return { loading: false, error: action.payload };
    
    case PRODUCT_CREATE_RESET:
      return {}; 

    default:
      return state;
  }
};
