import { MainScaleDuty, MainScaleDutyInBackend } from "@/@types/MainScaleDutyTypes";
import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainScaleDutyState {
  mainScaleDuties: MainScaleDuty[];
  loading: boolean;
  error: string | null;
}

const initialState: MainScaleDutyState = {
  mainScaleDuties: [],
  loading: false,
  error: null,
};

export const fetchMainScaleDuties = createAsyncThunk(
  "mainScaleDuty/fetchMainScaleDuties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/scales/main/duties");
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

export const createMainScaleDuty = createAsyncThunk(
  "mainScaleDuty/createMainScaleDuty",
  async (newDuty: Omit<MainScaleDutyInBackend[], "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/scales/main/duties/batch", newDuty);
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

export const updateMainScaleDuty = createAsyncThunk(
  "mainScaleDuty/updateMainScaleDuty",
  async (updatedDuty: MainScaleDuty, { rejectWithValue }) => {
    try {
      const response = await api.put(`/scales/main/duties/${updatedDuty.id}`, updatedDuty);
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

export const deleteMainScaleDuty = createAsyncThunk(
  "mainScaleDuty/deleteMainScaleDuty",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/scales/main/duties/${id}`);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Erro desconhecido");
      }
    }
  }
);

const mainScaleDutySlice = createSlice({
  name: "mainScaleDuty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainScaleDuties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainScaleDuties.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchMainScaleDuties.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error = action.error.message ?? "Erro desconhecido";

      })
      .addCase(createMainScaleDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMainScaleDuty.fulfilled, (state, action: PayloadAction<MainScaleDuty>) => {
        state.loading = false;
        state.mainScaleDuties.push(action.payload);
      })
      .addCase(createMainScaleDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";
      })
      .addCase(updateMainScaleDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMainScaleDuty.fulfilled, (state, action: PayloadAction<MainScaleDuty>) => {
        state.loading = false;
        const index = state.mainScaleDuties.findIndex((duty) => duty.id === action.payload.id);
        if (index !== -1) {
          state.mainScaleDuties[index] = action.payload;
        }
      })
      .addCase(updateMainScaleDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";
      })
      .addCase(deleteMainScaleDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMainScaleDuty.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.mainScaleDuties = state.mainScaleDuties.filter((duty) => duty.id !== action.payload);
      })
      .addCase(deleteMainScaleDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";

      });
  },
});

export const MainScaleDutyReducer = mainScaleDutySlice.reducer;