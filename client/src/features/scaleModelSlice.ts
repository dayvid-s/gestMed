import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScaleData } from "../@types/scaleTypes";
import { api } from "../services/axiosClient";

type ScaleState = {
    scaleModels: ScaleData[];
    loading: boolean;
    error: string | null;
};

const initialState: ScaleState = {
  scaleModels: [],
  loading: false,
  error: null,
};

export const fetchAllScaleModels = createAsyncThunk<ScaleData[], void, { rejectValue: string }>(
  "scalesModel/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ScaleData[]>("/schedule");
      if (response.status < 300) {
        console.log("Modelos de escala obtidas com sucesso");
        return response.data;
      } else {
        console.error("Falha ao obter escalas", response);
        return rejectWithValue("Falha ao obter escalas");
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Erro desconhecido");
      }
    }
  }
);

export const createScaleModel = createAsyncThunk<ScaleData, { name: string; total_of_schedule_days: number | null; is_auto_filled: boolean }, { rejectValue: string }>(
  "scalesModel/create",
  async ({ name, total_of_schedule_days, is_auto_filled }, { rejectWithValue }) => {
    try {
      const response = await api.post("/schedule", {
        name,
        total_of_schedule_days,
        is_auto_filled,
      });
      if (response.status < 300) {
        console.log("Modelo de escala criado com sucesso");
        return response.data;
      } else {
        console.error("Falha ao criar escala", response);
        return rejectWithValue("Falha ao criar escala");
      }
    } catch (error) {
      console.error("Falha ao criar escala", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Erro desconhecido");
      }
    }
  }
);

const scaleModelSlice = createSlice({
  name: "scaleModel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllScaleModels.fulfilled, (state, action: PayloadAction<ScaleData[]>) => {
        state.loading = false;
        state.scaleModels = action.payload;
      })
      .addCase(fetchAllScaleModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllScaleModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      })
      .addCase(createScaleModel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createScaleModel.fulfilled, (state, action: PayloadAction<ScaleData>) => {
        state.loading = false;
        state.scaleModels.push(action.payload);
      })
      .addCase(createScaleModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      });
  },
});

export const ScaleModelReducer = scaleModelSlice.reducer;
