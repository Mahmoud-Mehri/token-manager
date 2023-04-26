import {
  DEPLOY_LIST_LOADING,
  DEPLOY_LIST_SUCCESS,
  DEPLOY_LIST_FAILURE,
  DEPLOY_CREATE_PROGRESS,
  DEPLOY_CREATE_SUCCESS,
  DEPLOY_CREATE_FAILURE,
} from "../actions/deploy-actions";

const listInitialState = {
  loading: false,
  deploys: [],
  error: false,
  message: "",
};

export const deployList = (state = listInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DEPLOY_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        deploys: null,
        message: "",
      };
    case DEPLOY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        deploys: payload.deploys,
        message: payload.message,
      };
    case DEPLOY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        deploys: null,
        message: payload.message,
      };
    default:
      return state;
  }
};

const initialState = {
  inProgress: false,
  deployInfo: null,
  error: false,
  message: "",
};

export const createDeploy = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DEPLOY_CREATE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        deployInfo: null,
        error: false,
        message: "",
      };
    }
    case DEPLOY_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        deployInfo: payload.deploy,
      };
    }
    case DEPLOY_CREATE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        deployInfo: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};
