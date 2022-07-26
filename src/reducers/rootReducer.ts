import { combineReducers } from "redux";
import counterReducer from "./counter";
import apiReducer from "./api";

const rootReducer = combineReducers({
  counter: counterReducer,
  api: apiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
