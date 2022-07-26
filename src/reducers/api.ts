// I'll spare us the useless splitting into 4 files...

import { Dispatch, Reducer } from "redux";

type UsersResponse = { data: Array<{ email: string }> };

export const GET_USERS_PENDING = "GET_USERS_PENDING";
export const GET_USERS_FULFILLED = "GET_USERS_FULFILLED";
export const GET_USERS_REJECTED = "GET_USERS_REJECTED";

export type PendingAction = { type: typeof GET_USERS_PENDING };
export type FulfilledAction = {
  type: typeof GET_USERS_FULFILLED;
  payload: UsersResponse;
};
export type RejectedAction = {
  type: typeof GET_USERS_REJECTED;
  error: unknown;
};

export const pending = (): PendingAction => ({ type: GET_USERS_PENDING });
export const fulfilled = (payload: UsersResponse): FulfilledAction => ({
  type: GET_USERS_FULFILLED,
  payload,
});
export const rejected = (error: unknown): RejectedAction => ({
  type: GET_USERS_REJECTED,
  error,
});

export type ApiActions = PendingAction | FulfilledAction | RejectedAction;

export interface ApiState {
  status: "uninitialized" | "pending" | "fulfilled" | "rejected";
  data?: UsersResponse;
  error?: unknown;
}

const initialState: ApiState = { status: "uninitialized" };

const apiReducer: Reducer<ApiState, ApiActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USERS_PENDING:
      return { ...state, status: "pending" };
    case GET_USERS_FULFILLED:
      return { status: "fulfilled", data: action.payload, error: undefined };
    case GET_USERS_REJECTED:
      return { status: "rejected", error: action.error, data: undefined };
    default:
      return state;
  }
};

export const getUsersThunk = () => async (dispatch: Dispatch) => {
  dispatch(pending());
  let lastAction: FulfilledAction | RejectedAction;
  try {
    const result = await fetch("https://reqres.in/api/users");
    const json = await result.json();
    lastAction = fulfilled(json);
  } catch (e) {
    lastAction = rejected(e);
  }
  dispatch(lastAction);
};

export default apiReducer;
