import {
  USER_REGISTER_PROGRESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../actions/user-actions.js";

const initialState = {
  inProgress: false,
  user: null,
  error: false,
  message: "",
};

export const userRegister = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_PROGRESS:
      return {
        ...state,
        inProgress: true,
        error: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: false,
        user: payload.user,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        inProgress: false,
        user: null,
        error: true,
        message: payload.message,
      };
    default:
      return state;
  }
};

export const userLogin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_PROGRESS:
      return {
        ...state,
        inProgress: true,
        error: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: false,
        user: payload.user,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        inProgress: false,
        user: null,
        error: true,
        message: payload.message,
      };
    default:
      return state;
  }
};
