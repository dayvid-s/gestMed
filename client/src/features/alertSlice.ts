import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  title: string;
  type: "success" | "error" | "info";
  placement: "topStart" | "topEnd" | "bottomStart" | "bottomEnd";
  isOpen: boolean;
}

const initialState: AlertState = {
  title: "",
  type: "info",
  placement: "topStart",
  isOpen: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<{ type: AlertState["type"]; placement: AlertState["placement"]; title: string }>) {
      state.type = action.payload.type;
      state.placement = action.payload.placement;
      state.isOpen = true;
      state.title = action.payload.title

      // state.isOpen = false
    },
    hideAlert(state) {
      state.isOpen = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
