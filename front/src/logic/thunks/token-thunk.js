import axios from "axios";
import {
  tokenListLoading,
  tokenListSuccess,
  tokenListFailure,
  createTokenProgress,
  createTokenSuccess,
  createTokenFailure,
} from "../actions/token-actions";
import { Route_TOKEN_CREATE, ROUTE_TOKEN_LIST } from "../constants";

export const tokenListRequest = () => async (dispatch) => {
  try {
    dispatch(tokenListLoading());
    const response = await axios.get(ROUTE_TOKEN_LIST);
    if (!!response.success) {
      dispatch(tokenListSuccess(response.data));
    } else {
      if (response.message) {
        throw { message: response.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data;
    } else {
      message = err.message;
    }
    dispatch(tokenListFailure(message));
  }
};

export const createTokenRequest = (data) => async (dispatch) => {
  try {
    dispatch(createTokenProgress());
    const response = await axios.post(Route_TOKEN_CREATE, data);
    if (!!response.success) {
      dispatch(createTokenSuccess(response.data));
    } else {
      if (response.message) {
        throw { message: response.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data;
    } else {
      message = err.message;
    }
    dispatch(createTokenFailure(message));
  }
};
