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
