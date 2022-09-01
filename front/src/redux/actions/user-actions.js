export const USER_REGISTER_PROGRESS = "USER_REGISTER_PROGRESS";
export const userRegisterProgress = () => ({
  type: USER_REGISTER_PROGRESS,
});

export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const userRegisterSuccess = (user) => ({
  type: USER_REGISTER_SUCCESS,
  payload: { user },
});

export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";
export const userRegisterFailure = (message) => ({
  type: USER_REGISTER_FAILURE,
  payload: { message },
});

export const USER_LOGIN_PROGRESS = "USER_LOGIN_PROGRESS";
export const userLoginProgress = () => ({
  type: USER_LOGIN_PROGRESS,
});

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: { user },
});

export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const userLoginFailure = (message) => ({
  type: USER_LOGIN_FAILURE,
  payload: { message },
});
