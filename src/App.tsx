import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { decrement, increment } from "./reducers/counter";
import {
  getUsersThunk,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "./reducers/api";

function App() {
  const value = useSelector((state: RootState) => state.counter.value);
  const status = useSelector((state: RootState) => state.api.status);
  const data = useSelector((state: RootState) => state.api.data);
  const error = useSelector((state: RootState) => state.api.error);

  const result = useGetUsersQuery(undefined, { pollingInterval: 10000 });

  const dispatch = useDispatch() as ThunkDispatch<RootState, {}, AnyAction>;

  return (
    <>
      <section>
        <h1>Counter</h1>
        {value}
        <br />
        <button onClick={() => dispatch(increment(1))}>+1</button>
        <br />
        <button onClick={() => dispatch(decrement(5))}>-5</button>
      </section>
      <section>
        <h1>Server Data</h1>
        status: {status}
        <br />
        data: {JSON.stringify(data)}
        <br />
        error: {JSON.stringify(error)}
        <br />
        <button onClick={() => dispatch(getUsersThunk())}>get users</button>
      </section>

      <section>
        <h1>Server Data</h1>
        {JSON.stringify(result)}
        <button onClick={() => trigger()}>get users</button>
      </section>
    </>
  );
}

export default App;
