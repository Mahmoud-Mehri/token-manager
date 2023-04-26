import React from "react";

export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const useAuthState = () => {
  const state = React.useContext(AuthStateContext);
  if (!state) {
    throw new Error("There is no AuthStateContext available");
  }

  return state;
};

export const useAuthDispatch = () => {
  const dispatch = React.useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error("There is no AuthDispatchContext available");
  }

  return dispatch;
};
