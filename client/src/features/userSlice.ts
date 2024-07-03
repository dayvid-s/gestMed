import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../@types/userTypes";



const initialState: UserType = {
    id: 0,
    name: "",
    email: "",
    specialization: '',
    password: "",
    role: "Básico"
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser: (state, action: PayloadAction<string>) => {
            // console.log("veio aq")
            // const userFromMockup = usersMockup.find(user => user.name === action.payload);
            // console.log(userFromMockup);

            // if (userFromMockup) {
            //     return userFromMockup;
            // }
            // console.log(userFromMockup);
        },
    }
})

export const { changeUser } = userSlice.actions
export const UserReducer = userSlice.reducer
