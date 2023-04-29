import {
  SERVER_LIST_LOADING,
  SERVER_LIST_SUCCESS,
  SERVER_LIST_FAILURE,
  SERVER_CREATE_PROGRESS,
  SERVER_CREATE_SUCCESS,
  SERVER_CREATE_FAILURE,
  SERVER_UPDATE_PROGRESS,
  SERVER_UPDATE_SUCCESS,
  SERVER_UPDATE_FAILURE,
  SERVER_DELETE_PROGRESS,
  SERVER_DELETE_SUCCESS,
  SERVER_DELETE_FAILURE,
} from "../actions/server-actions";

const listInitialState = {
  loading: false,
  servers: [],
  error: false,
  message: "",
};

export const serverList = (state = listInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVER_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        servers: null,
        message: "",
      };
    case SERVER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        servers: payload.servers,
        message: payload.message,
      };
    case SERVER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        servers: null,
        message: payload.message,
      };
    default:
      return state;
  }
};

const initialState = {
  inProgress: false,
  server: null,
  error: false,
  message: "",
};

export const createServer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVER_CREATE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        server: null,
        error: false,
        message: "",
      };
    }
    case SERVER_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        server: payload.server,
      };
    }
    case SERVER_CREATE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        server: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};

export const updateServer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVER_UPDATE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        server: null,
        error: false,
        message: "",
      };
    }
    case SERVER_UPDATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        server: payload.server,
      };
    }
    case SERVER_UPDATE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        server: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};

export const deleteServer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVER_DELETE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        server: null,
        error: false,
        message: "",
      };
    }
    case SERVER_DELETE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        server: payload.server,
      };
    }
    case SERVER_DELETE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        server: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};
