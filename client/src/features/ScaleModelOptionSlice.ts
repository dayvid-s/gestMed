
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScaleOption = {
    label: string;
    value: string;
};

type ScaleOptionsState = {
    selectedScaleModel: ScaleOption | null;
};

const initialState: ScaleOptionsState = {
  selectedScaleModel: null,
};


const scaleOptionsSlice = createSlice({
  name: "scaleOptions",
  initialState,
  reducers: {
    setSelectedScaleModel: (state, action: PayloadAction<ScaleOption>) => {
      state.selectedScaleModel = action.payload;
    },
    clearSelectedScaleModel: (state) => {
      state.selectedScaleModel = null;
    },
  },
});

export const { setSelectedScaleModel, clearSelectedScaleModel } = scaleOptionsSlice.actions;
export const ScaleModelOptionReducer = scaleOptionsSlice.reducer;
