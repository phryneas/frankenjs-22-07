// I'll spare us the useless splitting into 4 files...

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Dispatch, Reducer } from "redux";
import { decrement, increment } from "./counter";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UsersResponse = { data: Array<{ email: string }> };

export interface ApiState {
  status: "uninitialized" | "pending" | "fulfilled" | "rejected";
  data?: UsersResponse;
  error?: unknown;
}

const initialState: ApiState = { status: "uninitialized" };

export const getUsersThunk = createAsyncThunk("api-users", async () => {
  const result = await fetch("https://reqres.in/api/users");
  return (await result.json()) as UsersResponse;
});

const slice = createSlice({
  name: "api-users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsersThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default slice.reducer;

//reqres.in/api/users

export const api = createApi({
  reducerPath: "createApiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api",
  }),
  endpoints(build) {
    return {
      getUsers: build.query<UsersResponse, void>({
        query() {
          return "/users";
        },
      }),
      getMoreUsers: build.query<UsersResponse, void>({
        query() {
          return {
            url: "/users",
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = api;
