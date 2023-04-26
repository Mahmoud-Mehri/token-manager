// DEPLOY_LIST
export const getDeployListLoading = (state) => {
  const { deployList } = state;
  return deployList.loading;
};

export const getDeployList = (state) => {
  const { deployList } = state;
  return deployList.deploys;
};

export const getDeployListError = (state) => {
  const { deployList } = state;
  return deployList.error;
};

export const getDeployListMessage = (state) => {
  const { deployList } = state;
  return deployList.message;
};

// DEPLOY_CREATE
export const getCreateDeployProgress = (state) => {
  const { createDeploy } = state;
  return createDeploy.inProgress;
};

export const getCreatedDeploy = (state) => {
  const { createDeploy } = state;
  return createDeploy.deploy;
};

export const getCreateDeployError = (state) => {
  const { createDeploy } = state;
  return createDeploy.error;
};

export const getCreateDeployMessage = (state) => {
  const { createDeploy } = state;
  return createDeploy.message;
};
