export const getRegisterProgress = (state) => {
  const { userRegister } = state;
  return userRegister.inProgress;
};

export const getRegisterError = (state) => {
  const { userRegister } = state;
  return userRegister.error;
};

export const getRegisterMessage = (state) => {
  const { userRegister } = state;
  return userRegister.message;
};

export const getRegisteredUser = (state) => {
  const { userRegister } = state;
  return userRegister.user;
};

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
  return userLogin.user;
};
