import { createSlice } from "@reduxjs/toolkit";

interface FormStepSLiceProps {
    actualStep: number;

}
const initialState: FormStepSLiceProps = {
  actualStep: 0
};

export const formStepSLice = createSlice({
  name: "formStepSlice",
  initialState,
  reducers: {
    increaseStep: (state) => {
      state.actualStep += 1;
      console.log(state.actualStep);
    },
    decreaseStep: (state) => {
      state.actualStep -= 1;
    }
  }
});



export const { increaseStep, decreaseStep } = formStepSLice.actions;
export const formStepReducer = formStepSLice.reducer;