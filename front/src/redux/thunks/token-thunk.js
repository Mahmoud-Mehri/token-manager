import axios from "axios";
import {
  tokenListLoading,
  tokenListSuccess,
  tokenListFailure,
} from "../actions/token-actions";
import { ROUTE_TOKEN_LIST } from "../constants/token-constants";

export const tokenListRequest = (data) => async (dispatch) => {
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
