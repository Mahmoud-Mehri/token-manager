import {
  deployListLoading,
  deployListSuccess,
  deployListFailure,
  createDeployProgress,
  createDeploySuccess,
  createDeployFailure,
} from "../actions/deploy-actions";
import { axiosClient } from "../axios-client";
import { ROUTE_DEPLOY } from "../constants";

export const deployListRequest = () => async (dispatch) => {
  try {
    dispatch(deployListLoading());
    const { data: result, ...response } = await axiosClient.get(ROUTE_DEPLOY);
    if (result && result.success) {
      dispatch(deployListSuccess(result.data));
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
    dispatch(deployListFailure(message));
  }
};

export const createDeployRequest = (data) => async (dispatch) => {
  try {
    dispatch(createDeployProgress());
    const { data: result, ...response } = await axiosClient.post(
      ROUTE_DEPLOY,
      data
    );
    if (result && result.success) {
      dispatch(createDeploySuccess(result.data));
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
    dispatch(createDeployFailure(message));
  }
};
