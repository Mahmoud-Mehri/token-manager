import {
  TOKEN_LIST_LOADING,
  TOKEN_LIST_SUCCESS,
  TOKEN_LIST_FAILURE,
  TOKEN_CREATE_SUCCESS,
  TOKEN_CREATE_FAILURE,
} from "../actions/token-actions";

const listInitialState = {
  loading: false,
  tokens: [],
  error: false,
  message: "",
};

export const tokenList = (state = listInitialState, action) => {
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

const initialState = {
  inProgress: false,
  token: null,
  error: false,
  message: "",
};

export const createToken = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOKEN_CREATE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        token: null,
        error: false,
        message: "",
      };
    }
    case TOKEN_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        token: payload.token,
      };
    }
    case TOKEN_CREATE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        token: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};
