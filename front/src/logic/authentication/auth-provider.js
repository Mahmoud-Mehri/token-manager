import React, { useReducer } from "react";
import { AuthDispatchContext, AuthStateContext } from "./auth-context";
import { userLogin } from "./auth-reducer";

const initialState = {
  inProgress: false,
  user: {
    authenticated: false,
    userName: "",
    email: "",
    loginDate: "",
    options: {},
  },
  error: false,
  message: "",
};

export const AuthProvider = ({ children }) => {
  const [authInfo, dispatch] = useReducer(userLogin, initialState);

  return (
    <AuthStateContext.Provider value={authInfo}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
