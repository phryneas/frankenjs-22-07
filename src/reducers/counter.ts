import { Reducer } from "redux";
import { DECREMENT, INCREMENT } from "../constants/counter";
import { CounterActions, CounterState } from "../types/counter";

const initialState: CounterState = { value: 0 };

const apiReducer: Reducer<CounterState, CounterActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + action.payload };
    case DECREMENT:
      return { ...state, value: state.value - action.payload };
    default:
      return state;
  }
};

export default apiReducer;
