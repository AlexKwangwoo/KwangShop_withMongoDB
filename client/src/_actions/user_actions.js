import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    productId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      //   console.log("리스폰데타", response.data);
      //   console.log("유저카트", userCart);
      // CartItem들에 해당하는 정보들을
      // Product Collection에서 가져온후에
      // Quantity 정보를 넣어 준다.
      userCart.forEach((cartItem) => {
        // userCart에는 이미 수량이 리덕스통해 저장되어있음!!
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
            //여기서 수량값(리덕스데이터)을 리스폰데이터에 넣어주는것임!
          }
        });
      });
      //   console.log("리스폰데타2", response.data);
      //   console.log("유저카트2", userCart);
      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeCartItem(productId) {
  const request = axios
    .get(`/api/users/removeFromCart?id=${productId}`)
    .then((response) => {
      //user에서 update를 통해 지워내고 나머지를 보내준다! response로
      //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다.
      response.data.cart.forEach((item) => {
        response.data.productInfo.forEach((product, index) => {
          if (item.id === product._id) {
            response.data.productInfo[index].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}

export function onSuccessBuy(data) {
  const request = axios
    .post(`/api/users/successBuy`, data)
    .then((response) => response.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
}
