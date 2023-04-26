export const DEPLOY_LIST_LOADING = "DEPLOY_LIST_LOADING";
export const deployListLoading = () => {
  return {
    type: DEPLOY_LIST_LOADING,
    payload: null,
  };
};

export const DEPLOY_LIST_SUCCESS = "DEPLOY_LIST_SUCCESS";
export const deployListSuccess = (deploys) => {
  return {
    type: DEPLOY_LIST_SUCCESS,
    payload: { deploys, message: "Deploy List loaded successfully" },
  };
};

export const DEPLOY_LIST_FAILURE = "DEPLOY_LIST_FAILURE";
export const deployListFailure = (message) => {
  return {
    type: DEPLOY_LIST_FAILURE,
    payload: { message },
  };
};

export const DEPLOY_CREATE_PROGRESS = "DEPLOY_CREATE_PROGRESS";
export const createDeployProgress = () => {
  return {
    type: DEPLOY_CREATE_PROGRESS,
    payload: null,
  };
};

export const DEPLOY_CREATE_SUCCESS = "DEPLOY_CREATE_SUCCESS";
export const createDeploySuccess = (deploy) => {
  return {
    type: DEPLOY_CREATE_SUCCESS,
    payload: { deploy, message: "Deploy created successfully" },
  };
};

export const DEPLOY_CREATE_FAILURE = "DEPLOY_CREATE_FAILURE";
export const createDeployFailure = (message) => {
  return {
    type: DEPLOY_CREATE_FAILURE,
    payload: { message },
  };
};
