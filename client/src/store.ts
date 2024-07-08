import { configureStore } from "@reduxjs/toolkit";
import { formStepReducer } from "./features/formStepSlice";
import { alertReducer } from "./features/alertSlice";
import { UserReducer } from "./features/userSlice";
import { AuthReducer } from "./features/authSlice";
import { ScaleModelReducer } from "./features/scaleModelSlice";
import { ScaleModelOptionReducer } from "./features/ScaleModelOptionSlice";
import { sideBarReducer } from "./features/sideBarSlice";

export const store = configureStore({
  reducer: {
    formStep: formStepReducer,
    alert: alertReducer,
    user: UserReducer,
    auth: AuthReducer,
    scaleModel: ScaleModelReducer,
    scaleOptions: ScaleModelOptionReducer,
    sideBar: sideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
