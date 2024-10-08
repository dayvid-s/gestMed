import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./features/alertSlice";
import { AuthReducer } from "./features/authSlice";
import { configurationReducer } from "./features/configurationSlice";
import { DoctorReducer } from "./features/doctorSclice";
import { solicitationReducer } from "./features/dutySolicitationSlice";
import { formStepReducer } from "./features/formStepSlice";
import { MainScaleDutyReducer } from "./features/MainScaleDutySlice";
import { MainScaleReducer } from "./features/MainScaleSlice";
import { ModalOfConfirmationSlice } from "./features/ModalOfConfirmationSlice";
import { ModelScaleDutyReducer } from "./features/ModelScaleDutySlice";
import { modelScaleOptionsReducer } from "./features/ModelScaleOptionSlice";
import { ModelScaleReducer } from "./features/ModelScaleSlice";
import { ShiftReducer } from "./features/shiftSlice";
import { sideBarReducer } from "./features/sideBarSlice";
import { UserReducer } from "./features/userSlice";

export const store = configureStore({
  reducer: {
    formStep: formStepReducer,
    alert: alertReducer,
    user: UserReducer,
    auth: AuthReducer,
    modelScale: ModelScaleReducer,
    modelScaleOptions: modelScaleOptionsReducer,
    modelScaleDuty: ModelScaleDutyReducer,
    mainScale: MainScaleReducer,
    mainScaleDuty: MainScaleDutyReducer,
    shift: ShiftReducer,
    dutySolicitation: solicitationReducer,
    sideBar: sideBarReducer,
    doctor: DoctorReducer,
    modalConfirmation: ModalOfConfirmationSlice,
    configuration: configurationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
