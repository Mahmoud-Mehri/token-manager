import axios from "axios";
import {
  ROUTE_USER_REGISTER,
  ROUTE_USER_LOGIN,
} from "../constants/user-constants";
import {
  userRegisterProgress,
  userRegisterSuccess,
  userRegisterFailure,
  userLoginProgress,
  userLoginSuccess,
  userLoginFailure,
} from "../actions/user-actions";

export const userRegisterRequest = (data) => async (dispatch) => {
  try {
    dispatch(userRegisterProgress());
    const response = await axios.post(ROUTE_USER_REGISTER, data);
    if (!!response.success) {
      dispatch(userRegisterSuccess(response.data));
    } else {
      if (response.message) {
        throw { message: response.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message = "";
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(userRegisterFailure(message));
  }
};

export const userLoginRequest = (data) => async (dispatch) => {
  try {
    dispatch(userLoginProgress());
    const response = await axios.post(ROUTE_USER_LOGIN, data);
    if (response.success) {
      dispatch(userLoginSuccess(response.data));
    } else {
      if (response.message) {
        throw { message: response.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message = "";
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(userLoginFailure(message));
  }
};
