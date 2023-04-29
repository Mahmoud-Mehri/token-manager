import {
  TOKEN_LIST_LOADING,
  TOKEN_LIST_SUCCESS,
  TOKEN_LIST_FAILURE,
  TOKEN_CREATE_PROGRESS,
  TOKEN_CREATE_SUCCESS,
  TOKEN_CREATE_FAILURE,
  TOKEN_UPDATE_PROGRESS,
  TOKEN_UPDATE_SUCCESS,
  TOKEN_UPDATE_FAILURE,
  TOKEN_DELETE_PROGRESS,
  TOKEN_DELETE_SUCCESS,
  TOKEN_DELETE_FAILURE,
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
        error: false,
        tokens: null,
        message: "",
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
        tokens: null,
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

export const updateToken = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOKEN_UPDATE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        token: null,
        error: false,
        message: "",
      };
    }
    case TOKEN_UPDATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        token: payload.token,
      };
    }
    case TOKEN_UPDATE_FAILURE: {
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

export const deleteToken = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOKEN_DELETE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        token: null,
        error: false,
        message: "",
      };
    }
    case TOKEN_DELETE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        token: payload.token,
      };
    }
    case TOKEN_DELETE_FAILURE: {
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
