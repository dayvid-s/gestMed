import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../@types/userTypes";

type DoctorState = {
  loading: boolean;
  error: string | null;
};

const initialState: DoctorState = {
  loading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk<
  UserData[],
  void,
  { rejectValue: string }
>("doctor/fetchDoctors", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/doctors");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Erro desconhecido");
    }
  }
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDoctors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctors.fulfilled,
        (state) => {
          state.loading = false;
        },
      )
      .addCase(
        fetchDoctors.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Erro ao buscar médicos";
        },
      );
  },
});

export const DoctorReducer = doctorSlice.reducer;
