// SERVER_LIST
export const getServerListLoading = (state) => {
  const { serverList } = state;
  return serverList.loading;
};

export const getServerList = (state) => {
  const { serverList } = state;
  return serverList.servers;
};

export const getServerListError = (state) => {
  const { serverList } = state;
  return serverList.error;
};

export const getServerListMessage = (state) => {
  const { serverList } = state;
  return serverList.message;
};

// SERVER_CREATE
export const getCreateServerProgress = (state) => {
  const { createServer } = state;
  return createServer.inProgress;
};

export const getCreatedServer = (state) => {
  const { createServer } = state;
  return createServer.server;
};

export const getCreateServerError = (state) => {
  const { createServer } = state;
  return createServer.error;
};

export const getCreateServerMessage = (state) => {
  const { createServer } = state;
  return createServer.message;
};

// SERVER_UPDATE
export const getUpdateServerProgress = (state) => {
  const { updateServer } = state;
  return updateServer.inProgress;
};

export const getUpdatedServer = (state) => {
  const { updateServer } = state;
  return updateServer.server;
};

export const getUpdateServerError = (state) => {
  const { updateServer } = state;
  return updateServer.error;
};

export const getUpdateServerMessage = (state) => {
  const { updateServer } = state;
  return updateServer.message;
};

// SERVER_DELETE
export const getDeleteServerProgress = (state) => {
  const { deleteServer } = state;
  return deleteServer.inProgress;
};

export const getDeletedServer = (state) => {
  const { deleteServer } = state;
  return deleteServer.server;
};

export const getDeleteServerError = (state) => {
  const { deleteServer } = state;
  return deleteServer.error;
};

export const getDeleteServerMessage = (state) => {
  const { deleteServer } = state;
  return deleteServer.message;
};
