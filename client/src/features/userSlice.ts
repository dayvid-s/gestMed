import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../@types/userTypes";

type UserState = {
    user: UserData | null;
    users: UserData[];
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
  user: null,
  users: [],
  loading: false,   
  error: null,
};

export const createUser = createAsyncThunk<
    UserData,
    UserData,
    { rejectValue: string }
>("user/createUser", async (userData, { rejectWithValue }) => {
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
});

export const deleteUser = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await api.delete(`/user/${userId}`);
    return userId;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Erro desconhecido");
    }
  }
});

export const fetchUsers = createAsyncThunk<
    UserData[],
    void,
    { rejectValue: string }
>("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Erro desconhecido");
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        createUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Erro ao criar usuário";
        },
      )
      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        if (state.user && state.user.id === action.payload) {
          state.user = null;
        }
        state.loading = false;
      })
      .addCase(
        deleteUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Erro ao deletar usuário";
        },
      )
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.users = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        fetchUsers.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Erro ao buscar usuários";
        },
      );
  },
});

export const UserReducer = userSlice.reducer;
