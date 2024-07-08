import { createSlice } from "@reduxjs/toolkit";

interface Alert {
    value: boolean;
}

const initialState: Alert = {
  value: false
};

export const alert = createSlice({
  name: "openAlert",
  initialState,
  reducers: {
    handleWithAlert: (state) => {
      state.value = !state.value;
    },
  }
});


export const { handleWithAlert } = alert.actions;
export const alertReducer = alert.reducer;