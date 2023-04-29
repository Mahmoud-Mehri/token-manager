import {
  tokenListLoading,
  tokenListSuccess,
  tokenListFailure,
  createTokenProgress,
  createTokenSuccess,
  createTokenFailure,
  updateTokenProgress,
  updateTokenSuccess,
  updateTokenFailure,
  deleteTokenProgress,
  deleteTokenSuccess,
  deleteTokenFailure,
} from "../actions/token-actions";
import { axiosClient } from "../axios-client";
import { ROUTE_TOKENS } from "../constants";

export const tokenListRequest = () => async (dispatch) => {
  try {
    dispatch(tokenListLoading());
    const { data: result, ...response } = await axiosClient.get(ROUTE_TOKENS);
    if (result && result.success) {
      dispatch(tokenListSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(tokenListFailure(message));
  }
};

export const createTokenRequest = (data) => async (dispatch) => {
  try {
    dispatch(createTokenProgress());
    const { data: result, ...response } = await axiosClient.post(
      ROUTE_TOKENS,
      data
    );
    if (result && result.success) {
      dispatch(createTokenSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(createTokenFailure(message));
  }
};

export const updateTokenRequest = (data) => async (dispatch) => {
  try {
    dispatch(updateTokenProgress());
    const { data: result, ...response } = await axiosClient.put(
      ROUTE_TOKENS + `/${data.id}`,
      data
    );
    if (result && result.success) {
      dispatch(updateTokenSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(updateTokenFailure(message));
  }
};

export const deleteTokenRequest = (data) => async (dispatch) => {
  try {
    dispatch(deleteTokenProgress());
    const { data: result, ...response } = await axiosClient.delete(
      ROUTE_TOKENS + `/${data.id}`
    );
    if (result && result.success) {
      dispatch(deleteTokenSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(deleteTokenFailure(message));
  }
};
