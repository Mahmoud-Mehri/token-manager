import { createStore, combineReducers, applyMiddleware } from "redux";
import { userRegister } from "./reducers/user-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = { userRegister };
const rootReducer = combineReducers(reducers);

export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
