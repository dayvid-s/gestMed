import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./features/alertSlice";
import { AuthReducer } from "./features/authSlice";
import { formStepReducer } from "./features/formStepSlice";
import { ScaleModelOptionReducer } from "./features/ScaleModelOptionSlice";
import { ScaleModelReducer } from "./features/scaleModelSlice";
import { ShiftReducer } from "./features/shiftSlice";
import { sideBarReducer } from "./features/sideBarSlice";
import { UserReducer } from "./features/userSlice";

export const store = configureStore({
  reducer: {
    formStep: formStepReducer,
    alert: alertReducer,
    user: UserReducer,
    auth: AuthReducer,
    scaleModel: ScaleModelReducer,
    scaleOptions: ScaleModelOptionReducer,
    shift: ShiftReducer,
    sideBar: sideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
