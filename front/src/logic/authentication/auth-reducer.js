import {
  USER_LOGIN_PROGRESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "./auth-actions";

export const userLogin = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_PROGRESS:
      return {
        ...state,
        inProgress: true,
        error: false,
        message: "Authenticating ...",
      };
    case USER_LOGIN_SUCCESS:
      console.log(`SUCCESS: ${JSON.stringify(payload)}`);
      return {
        ...state,
        inProgress: false,
        error: false,
        user: {
          ...payload.user,
        },
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: true,
        message: payload.message,
      };
    default:
      return state;
  }
};
