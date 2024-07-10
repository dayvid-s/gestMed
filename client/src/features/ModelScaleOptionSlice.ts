
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScaleOption = {
  label: string;
  value: string;
};

type modelScaleOptionsState = {
  selectedmodelScale: ScaleOption | null;
};

const initialState: modelScaleOptionsState = {
  selectedmodelScale: null,
};


const modelScaleOptionsSlice = createSlice({
  name: "modelScaleOptions",
  initialState,
  reducers: {
    setSelectedmodelScale: (state, action: PayloadAction<ScaleOption>) => {
      state.selectedmodelScale = action.payload;
    },
    clearSelectedmodelScale: (state) => {
      state.selectedmodelScale = null;
    },
  },
});

export const { setSelectedmodelScale, clearSelectedmodelScale } = modelScaleOptionsSlice.actions;
export const modelScaleOptionsReducer = modelScaleOptionsSlice.reducer;
