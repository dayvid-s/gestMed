import { Shift } from "@/@types/userTypes";
import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShiftState = {
  shifts: Shift[];
  loading: boolean;
  error: string | null;
};

const initialState: ShiftState = {
  shifts: [],
  loading: false,
  error: null,
};

export const fetchShifts = createAsyncThunk<Shift[], void, { rejectValue: string }>(
  "shift/fetchShifts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/shifts");
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

const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShifts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShifts.fulfilled, (state, action: PayloadAction<Shift[]>) => {
        state.shifts = action.payload;
        state.loading = false;
      })
      .addCase(fetchShifts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Erro ao buscar turnos";
      });
  },
});

export const ShiftReducer = shiftSlice.reducer;
