export const TOKEN_LIST_LOADING = "TOKEN_LIST_LOADING";
export const tokenListLoading = () => {
  return {
    type: TOKEN_LIST_LOADING,
    payload: null,
  };
};

export const TOKEN_LIST_SUCCESS = "TOKEN_LIST_SUCCESS";
export const tokenListSuccess = (tokens) => {
  return {
    type: TOKEN_LIST_SUCCESS,
    payload: { tokens, message: "Token List successfully loaded" },
  };
};

export const TOKEN_LIST_FAILURE = "TOKEN_LIST_FAILURE";
export const tokenListFailure = (message) => {
  return {
    type: TOKEN_LIST_FAILURE,
    payload: { message },
  };
};
