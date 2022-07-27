import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counter";
import apiReducer from "../reducers/api";
import { api } from "../reducers/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    api: apiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(api.middleware);
  },
});
