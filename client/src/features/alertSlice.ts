import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  type: "success" | "error" | "info";
  placement: "topStart" | "topEnd" | "bottomStart" | "bottomEnd";
  isOpen: boolean;
}

const initialState: AlertState = {
  message: "",
  type: "info",
  placement: "topStart",
  isOpen: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<{ message: string; type: AlertState["type"]; placement: AlertState["placement"] }>) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.placement = action.payload.placement;
      state.isOpen = true;
    },
    hideAlert(state) {
      state.isOpen = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
