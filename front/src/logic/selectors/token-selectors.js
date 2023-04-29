// TOKEN_LIST
export const getTokenListLoading = (state) => {
  const { tokenList } = state;
  return tokenList.loading;
};

export const getTokenList = (state) => {
  const { tokenList } = state;
  return tokenList.tokens;
};

export const getTokenListError = (state) => {
  const { tokenList } = state;
  return tokenList.error;
};

export const getTokenListMessage = (state) => {
  const { tokenList } = state;
  return tokenList.message;
};

// TOKEN_CREATE
export const getCreateTokenProgress = (state) => {
  const { createToken } = state;
  return createToken.inProgress;
};

export const getCreatedToken = (state) => {
  const { createToken } = state;
  return createToken.token;
};

export const getCreateTokenError = (state) => {
  const { createToken } = state;
  return createToken.error;
};

export const getCreateTokenMessage = (state) => {
  const { createToken } = state;
  return createToken.message;
};

// TOKEN_UPDATE
export const getUpdateTokenProgress = (state) => {
  const { updateToken } = state;
  return updateToken.inProgress;
};

export const getUpdatedToken = (state) => {
  const { updateToken } = state;
  return updateToken.token;
};

export const getUpdateTokenError = (state) => {
  const { updateToken } = state;
  return updateToken.error;
};

export const getUpdateTokenMessage = (state) => {
  const { updateToken } = state;
  return updateToken.message;
};

// TOKEN_DELETE
export const getDeleteTokenProgress = (state) => {
  const { deleteToken } = state;
  return deleteToken.inProgress;
};

export const getDeletedToken = (state) => {
  const { deleteToken } = state;
  return deleteToken.token;
};

export const getDeleteTokenError = (state) => {
  const { deleteToken } = state;
  return deleteToken.error;
};

export const getDeleteTokenMessage = (state) => {
  const { deleteToken } = state;
  return deleteToken.message;
};
