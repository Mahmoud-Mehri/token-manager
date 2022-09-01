import { createStore, combineReducers, applyMiddleware } from "redux";
import { userRegister, userLogin } from "./reducers/user-reducer";
import { tokenList } from "./reducers/token-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = { userRegister, userLogin, tokenList };
const rootReducer = combineReducers(reducers);

export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
