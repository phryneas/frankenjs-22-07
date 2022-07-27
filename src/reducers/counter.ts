import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CounterState = {
  value: number;
};

const initialState: CounterState = { value: 0 };

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    decrement(state, action: PayloadAction<number>) {
      state.value -= action.payload;
    },
  },
});

export const { decrement, increment } = slice.actions;

export default slice.reducer;
