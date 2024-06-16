import { callApi } from "../../config/axios";
import { BASE_URL } from "../../config/axios";

export const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({type:"USER_LOGIN_PENDING"})
    try{
      const response = await callApi("post", `${BASE_URL}/user/login`, {
        email,
        password,
      });
      dispatch({
        type: "USER_LOGIN_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "USER_LOGIN_REJECTED",
        payload: error.message || 'Login failed',
      });
    }
  };
};

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

export const userRegister = ({ email, password, username }) => {
  return async (dispatch) => {
    dispatch({type:"USER_REGISTER_PENDING"})
    try{
      const response = await callApi("post", `${BASE_URL}/user/register`, {
        email,
        password,
        username,
      });
      dispatch({
        type: "USER_REGISTER_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "USER_REGISTER_REJECTED",
        payload: error.message || 'Register failed',
      });
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch({type:"GET_USER_PENDING"})
    try{
      const response =await callApi("get", `${BASE_URL}/user/profile`);
      dispatch({
        type: "GET_USER_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "GET_USER_REJECTED",
        payload: error.message || 'failed',
      });
    }
  };
};
