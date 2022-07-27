import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { decrement, increment } from "./actions/counter";
import { getUsersThunk } from "./reducers/api";

function App() {
  const value = useSelector((state: RootState) => state.counter.value);
  const status = useSelector((state: RootState) => state.api.status);
  const data = useSelector((state: RootState) => state.api.data);
  const error = useSelector((state: RootState) => state.api.error);

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
        <pre>
          status: {status}
        </pre>
        <pre> 
          data: {JSON.stringify(data, null, 4)}
        </pre>
        <pre>
          error: {JSON.stringify(error)}
        </pre>
        <button onClick={() => dispatch(getUsersThunk())}>Get Users</button>
      </section>
    </>
  );
}

export default App;
