import { createStore, combineReducers, applyMiddleware } from "redux";
import { userRegister } from "./reducers/user-reducer";
import { tokenList, createToken } from "./reducers/token-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = { userRegister, tokenList, createToken };
const rootReducer = combineReducers(reducers);

export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
