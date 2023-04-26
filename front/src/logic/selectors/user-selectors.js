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
