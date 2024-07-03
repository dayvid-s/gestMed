import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserData, UserType } from "../@types/userTypes";
import { api } from "../services/axiosClient";

type UserState = {
    user: UserData | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};


export const createUser = createAsyncThunk<UserData, UserData, { rejectValue: string }>(
    "user/createUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("/user", userData);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("Erro desconhecido");
            }
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Erro ao criar usuário";
            });
    },
});

export const UserReducer = userSlice.reducer;
