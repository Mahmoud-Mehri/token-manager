import {
  serverListLoading,
  serverListSuccess,
  serverListFailure,
  createServerProgress,
  createServerSuccess,
  createServerFailure,
  updateServerProgress,
  updateServerSuccess,
  updateServerFailure,
  deleteServerProgress,
  deleteServerSuccess,
  deleteServerFailure,
} from "../actions/server-actions";
import { axiosClient } from "../axios-client";
import { ROUTE_SERVERS } from "../constants";

export const serverListRequest = () => async (dispatch) => {
  try {
    dispatch(serverListLoading());
    const { data: result, ...response } = await axiosClient.get(ROUTE_SERVERS);
    if (result && result.success) {
      dispatch(serverListSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(serverListFailure(message));
  }
};

export const createServerRequest = (data) => async (dispatch) => {
  try {
    dispatch(createServerProgress());
    const { data: result, ...response } = await axiosClient.post(
      ROUTE_SERVERS,
      data
    );
    if (result && result.success) {
      dispatch(createServerSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(createServerFailure(message));
  }
};

export const updateServerRequest = (data) => async (dispatch) => {
  try {
    dispatch(updateServerProgress());
    const { data: result, ...response } = await axiosClient.put(
      ROUTE_SERVERS + `/${data.id}`,
      data
    );
    if (result && result.success) {
      dispatch(updateServerSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(updateServerFailure(message));
  }
};

export const deleteServerRequest = (data) => async (dispatch) => {
  try {
    dispatch(deleteServerProgress());
    const { data: result, ...response } = await axiosClient.delete(
      ROUTE_SERVERS + `/${data.id}`
    );
    if (result && result.success) {
      dispatch(deleteServerSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(deleteServerFailure(message));
  }
};
