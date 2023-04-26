export const getLoginProgress = (state) => {
  const { userLogin } = state;
  return userLogin.inProgress;
};

export const getLoginError = (state) => {
  const { userLogin } = state;
  return userLogin.error;
};

export const getLoginMessage = (state) => {
  const { userLogin } = state;
  return userLogin.message;
};

export const getLoggedInUser = (state) => {
  const { userLogin } = state;
  console.log(`SELECTOR: ${JSON.stringify(userLogin.user)}`);
  return userLogin.user;
};
