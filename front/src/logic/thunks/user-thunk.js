import axios from "axios";
import { ROUTE_REGISTER } from "../constants";
import {
  userRegisterProgress,
  userRegisterSuccess,
  userRegisterFailure,
} from "../actions/user-actions";

export const userRegisterRequest = (data) => async (dispatch) => {
  try {
    dispatch(userRegisterProgress());
    const { data: result, ...response } = await axios.post(
      ROUTE_REGISTER,
      data.registerInfo
    );
    if (result && result.success) {
      data.setAuthInfo((currentAuthInfo) => {
        return {
          authenticated: true,
          userName: "LoggedInUser",
          email: result.data.email,
          loginDate: new Date(),
          ...currentAuthInfo,
        };
      });
      dispatch(userRegisterSuccess(result.data));
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    let message = "";
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }
    dispatch(userRegisterFailure(message));
  }
};
