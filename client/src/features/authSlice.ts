import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../@types/user";
import { api } from '../services/axiosClient'
import Cookies from "js-cookie";
type ChangeUserPayload = {
    user: UserType;
};


type AuthState = {
    user: UserType | null
    token: string | null
}
type SignInPayload = {
    email: string;
    password: string;
};
const initialState: AuthState = {
    user: {
        id: null,
        email: null,
        name: null,
        specialization: null,
        password: null,
        role: null
    },
    token: null
};

export const signInAsync = createAsyncThunk(
    'user/signInAsync',
    async (payload: SignInPayload) => {
        try {
            console.log("veio aq dados:", payload.email, payload.password)
            const response = await api.post("/login", {
                email: payload.email,
                password: payload.password,
            });


            return response.data;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    }
);
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeUser: (state, action: PayloadAction<ChangeUserPayload>) => {
            state.user = action.payload.user;
        },
        searchUser: (state) => {
            const userCookie = Cookies.get('auth_user')
            const tokenCookie = Cookies.get('auth_token')
            const isAuthenticated = state.user?.id !== null && initialState.token !== null;

            if (!isAuthenticated) {
                if (userCookie && tokenCookie) {
                    state.user = JSON.parse(userCookie);
                    state.token = tokenCookie;
                }
            }
        },
        logoutUser: (state) => {
            Cookies.remove('auth_user');
            Cookies.remove('auth_token');

            state.user = null;
            state.token = null;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(signInAsync.fulfilled, (state, action: PayloadAction<AuthState>) => {
            console.log('resultado da action', action.payload.token)
            state.user = action.payload.user;
            state.token = action.payload.token
            console.log("essa bomba passou", state.user)
            if (state.token) {
                console.log('meu par')

                Cookies.set("auth_token", state.token, { expires: 1 / 3 });
                Cookies.set("auth_user", JSON.stringify(state.user), { expires: 1 / 3 });
                api.defaults.headers.common["Authorization"] =
                    `Bearer ${action.payload.token}`
            }
        })
            .addCase(signInAsync.rejected, (state, action) => {
                console.error('Erro ao fazer login:', action.error.message);
                state.user = null;
                state.token = null;
                Cookies.remove("@Auth:token");
                Cookies.remove("@Auth:user");
            });
    },
});

export const { changeUser, searchUser, logoutUser } = authSlice.actions;
export const AuthReducer = authSlice.reducer;