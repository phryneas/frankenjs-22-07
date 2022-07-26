import { INCREMENT, DECREMENT } from "../constants/counter";

export type CounterState = {
  value: number;
};

export type IncrementAction = { type: typeof INCREMENT; payload: number };
export type DecrementAction = { type: typeof DECREMENT; payload: number };

export type CounterActions = IncrementAction | DecrementAction;
