import { DECREMENT, INCREMENT } from "../constants/counter";
import { IncrementAction } from "../types/counter";

export const increment = (by: number): IncrementAction => ({
  type: INCREMENT,
  payload: by,
});

export const decrement = (by: number) => ({
  type: DECREMENT,
  payload: by,
});
