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
