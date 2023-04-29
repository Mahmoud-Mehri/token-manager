export const SERVER_LIST_LOADING = "SERVER_LIST_LOADING";
export const serverListLoading = () => {
  return {
    type: SERVER_LIST_LOADING,
    payload: null,
  };
};

export const SERVER_LIST_SUCCESS = "SERVER_LIST_SUCCESS";
export const serverListSuccess = (servers) => {
  return {
    type: SERVER_LIST_SUCCESS,
    payload: { servers, message: "Server List loaded successfully" },
  };
};

export const SERVER_LIST_FAILURE = "SERVER_LIST_FAILURE";
export const serverListFailure = (message) => {
  return {
    type: SERVER_LIST_FAILURE,
    payload: { message },
  };
};

export const SERVER_CREATE_PROGRESS = "SERVER_CREATE_PROGRESS";
export const createServerProgress = () => {
  return {
    type: SERVER_CREATE_PROGRESS,
    payload: null,
  };
};

export const SERVER_CREATE_SUCCESS = "SERVER_CREATE_SUCCESS";
export const createServerSuccess = (server) => {
  return {
    type: SERVER_CREATE_SUCCESS,
    payload: { server, message: "Server created successfully" },
  };
};

export const SERVER_CREATE_FAILURE = "SERVER_CREATE_FAILURE";
export const createServerFailure = (message) => {
  return {
    type: SERVER_CREATE_FAILURE,
    payload: { message },
  };
};

export const SERVER_UPDATE_PROGRESS = "SERVER_UPDATE_PROGRESS";
export const updateServerProgress = () => {
  return {
    type: SERVER_UPDATE_PROGRESS,
    payload: null,
  };
};

export const SERVER_UPDATE_SUCCESS = "SERVER_UPDATE_SUCCESS";
export const updateServerSuccess = (server) => {
  return {
    type: SERVER_UPDATE_SUCCESS,
    payload: { server, message: "Server updated successfully" },
  };
};

export const SERVER_UPDATE_FAILURE = "SERVER_UPDATE_FAILURE";
export const updateServerFailure = (message) => {
  return {
    type: SERVER_UPDATE_FAILURE,
    payload: { message },
  };
};

export const SERVER_DELETE_PROGRESS = "SERVER_DELETE_PROGRESS";
export const deleteServerProgress = () => {
  return {
    type: SERVER_DELETE_PROGRESS,
    payload: null,
  };
};

export const SERVER_DELETE_SUCCESS = "SERVER_DELETE_SUCCESS";
export const deleteServerSuccess = (server) => {
  return {
    type: SERVER_DELETE_SUCCESS,
    payload: { server, message: "Server deleted successfully" },
  };
};

export const SERVER_DELETE_FAILURE = "SERVER_DELETE_FAILURE";
export const deleteServerFailure = (message) => {
  return {
    type: SERVER_DELETE_FAILURE,
    payload: { message },
  };
};
