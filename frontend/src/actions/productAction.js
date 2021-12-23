import axios from "axios";
import {
  PRODUCT_LISTREQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_Details_REQUEST,
  PRODUCT_Details_SUCCESS,
  PRODUCT_Details_FAILED,
} from "../constants/productConstant";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LISTREQUEST });

    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAILED, payload: error });
  }
};



export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_Details_REQUEST });
    console.log(id)
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_Details_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_Details_FAILED, payload: error });
  }
};