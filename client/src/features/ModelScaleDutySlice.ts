import { ModelScaleDuty, ModelScaleDutyInBackend } from "@/@types/ModelScaleDutyTypes";
import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelScaleDutyState {
  modelScaleDuties: ModelScaleDuty[];
  loading: boolean;
  error: string | null;
}

const initialState: ModelScaleDutyState = {
  modelScaleDuties: [],
  loading: false,
  error: null,
};

export const fetchModelScaleDuties = createAsyncThunk(
  "modelScaleDuty/fetchModelScaleDuties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/scales/models/duties");
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

export const createModelScaleDuty = createAsyncThunk(
  "modelScaleDuty/createModelScaleDuty",
  async (newDuty: Omit<ModelScaleDutyInBackend[], "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/scales/models/duties/batch", newDuty);
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

export const updateModelScaleDuty = createAsyncThunk(
  "modelScaleDuty/updateModelScaleDuty",
  async (updatedDuty: ModelScaleDuty, { rejectWithValue }) => {
    try {
      const response = await api.put(`/scales/models/duties/${updatedDuty.id}`, updatedDuty);
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

export const deleteModelScaleDuty = createAsyncThunk(
  "modelScaleDuty/deleteModelScaleDuty",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/scales/models/duties/${id}`);
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

const modelScaleDutySlice = createSlice({
  name: "modelScaleDuty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModelScaleDuties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModelScaleDuties.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchModelScaleDuties.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error = action.error.message ?? "Erro desconhecido";

      })
      .addCase(createModelScaleDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createModelScaleDuty.fulfilled, (state, action: PayloadAction<ModelScaleDuty>) => {
        state.loading = false;
        state.modelScaleDuties.push(action.payload);
      })
      .addCase(createModelScaleDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";
      })
      .addCase(updateModelScaleDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateModelScaleDuty.fulfilled, (state, action: PayloadAction<ModelScaleDuty>) => {
        state.loading = false;
        const index = state.modelScaleDuties.findIndex((duty) => duty.id === action.payload.id);
        if (index !== -1) {
          state.modelScaleDuties[index] = action.payload;
        }
      })
      .addCase(updateModelScaleDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";
      })
      .addCase(deleteModelScaleDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteModelScaleDuty.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.modelScaleDuties = state.modelScaleDuties.filter((duty) => duty.id !== action.payload);
      })
      .addCase(deleteModelScaleDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";

      });
  },
});

export const ModelScaleDutyReducer = modelScaleDutySlice.reducer;
