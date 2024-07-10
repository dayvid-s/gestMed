import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./features/alertSlice";
import { AuthReducer } from "./features/authSlice";
import { DoctorReducer } from "./features/doctorSclice";
import { formStepReducer } from "./features/formStepSlice";
import { ModelScaleReducer } from "./features/ModelScaleSlice";
import { ShiftReducer } from "./features/shiftSlice";
import { sideBarReducer } from "./features/sideBarSlice";
import { UserReducer } from "./features/userSlice";

import { modelScaleOptionsReducer } from "./features/ModelScaleOptionSlice";

export const store = configureStore({
  reducer: {
    formStep: formStepReducer,
    alert: alertReducer,
    user: UserReducer,
    auth: AuthReducer,
    modelScale: ModelScaleReducer,
    modelScaleOptions: modelScaleOptionsReducer,
    shift: ShiftReducer,
    sideBar: sideBarReducer,
    doctor: DoctorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
