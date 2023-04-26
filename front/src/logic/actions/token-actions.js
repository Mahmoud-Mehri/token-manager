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
    payload: { tokens, message: "Token List loaded successfully" },
  };
};

export const TOKEN_LIST_FAILURE = "TOKEN_LIST_FAILURE";
export const tokenListFailure = (message) => {
  return {
    type: TOKEN_LIST_FAILURE,
    payload: { message },
  };
};

export const TOKEN_CREATE_PROGRESS = "TOKEN_CREATE_PROGRESS";
export const createTokenProgress = () => {
  return {
    type: TOKEN_CREATE_PROGRESS,
    payload: null,
  };
};

export const TOKEN_CREATE_SUCCESS = "TOKEN_CREATE_SUCCESS";
export const createTokenSuccess = (token) => {
  return {
    type: TOKEN_CREATE_SUCCESS,
    payload: { token, message: "Token created successfully" },
  };
};

export const TOKEN_CREATE_FAILURE = "TOKEN_CREATE_FAILURE";
export const createTokenFailure = (message) => {
  return {
    type: TOKEN_CREATE_FAILURE,
    payload: { message },
  };
};
