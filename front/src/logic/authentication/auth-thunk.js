import {
  userLoginProgress,
  userLoginSuccess,
  userLoginFailure,
} from "./auth-actions";
import { ROUTE_LOGIN } from "../constants";
import { axiosClient } from "../axios-client";
import axios from "axios";

axios.interceptors.request.use((req) => {
  console.log(`REQUEST: ${JSON.stringify(req, null, 2)}`);
  return req;
});

axios.interceptors.response.use((res) => {
  console.log(`RESPONSE: ${JSON.stringify(res, null, 2)}`);
  return res;
});

export const userLoginRequest = async (data, dispatch) => {
  try {
    dispatch(userLoginProgress());
    console.log(`Data: ${JSON.stringify(data)}`);
    const { data: result, ...response } = await axiosClient.post(
      ROUTE_LOGIN,
      data
    );

    console.log(`Response: ${JSON.stringify(response)}`);
    console.log(`Result: ${JSON.stringify(result)}`);
    if (result && result.success) {
      console.log(`Before Dispatch User: ${JSON.stringify(result.data)}`);
      dispatch(
        userLoginSuccess({
          authenticated: true,
          userName: "LoggedInUser",
          email: result.data.email,
          loginDate: new Date(),
          options: {},
        })
      );
      console.log(`After Dispatch User: ${JSON.stringify(result.data)}`);
    } else {
      if (result) {
        throw { message: result.message };
      } else {
        throw { message: `${response.status} : ${response.statusText}` };
      }
    }
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);

    let message = "";
    if (err.response) {
      message = err.response.message;
    } else {
      message = err.message;
    }

    dispatch(userLoginFailure(message));
  }
};
