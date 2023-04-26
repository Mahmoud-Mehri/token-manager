export const USER_LOGIN_PROGRESS = "USER_LOGIN_PROGRESS";
export const userLoginProgress = () => ({
  type: USER_LOGIN_PROGRESS,
});

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const userLoginSuccess = (user) => {
  console.log(`User: ${JSON.stringify(user)}`);

  return {
    type: USER_LOGIN_SUCCESS,
    payload: { user },
  };
};

export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const userLoginFailure = (message) => ({
  type: USER_LOGIN_FAILURE,
  payload: { message },
});
