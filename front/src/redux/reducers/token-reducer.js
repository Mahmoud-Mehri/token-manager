import {
  TOKEN_LIST_LOADING,
  TOKEN_LIST_SUCCESS,
  TOKEN_LIST_FAILURE,
} from "../actions/token-actions";

const initialState = {
  loading: false,
  tokens: [],
  error: false,
  message: "",
};

export const tokenList = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOKEN_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TOKEN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tokens: payload.tokens,
        message: payload.message,
      };
    case TOKEN_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: payload.message,
      };
    default:
      return state;
  }
};
