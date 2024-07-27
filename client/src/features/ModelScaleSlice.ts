import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScaleData } from "../@types/scaleTypes";
import { api } from "../services/axiosClient";

type ScaleState = {
  ModelScales: ScaleData[];
  loading: boolean;
  error: string | null;
};

const initialState: ScaleState = {
  ModelScales: [],
  loading: false,
  error: null,
};

export const fetchAllModelScales = createAsyncThunk<ScaleData[], void, { rejectValue: string }>(
  "scalesModel/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ScaleData[]>("/scales/models");
      if (response.status < 300) {
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

export const createModelScale = createAsyncThunk<ScaleData, { name: string; total_of_scale_days: number | null; is_auto_filled: boolean }, { rejectValue: string }>(
  "scalesModel/create",
  async ({ name, total_of_scale_days, is_auto_filled }, { rejectWithValue }) => {
    try {
      const response = await api.post("/scales/models", {
        name,
        total_of_scale_days,
        is_auto_filled,
      });
      if (response.status < 300) {
        // console.log("Modelo de escala criado com sucesso");
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

const ModelScaleSlice = createSlice({
  name: "modelScale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllModelScales.fulfilled, (state, action: PayloadAction<ScaleData[]>) => {
        state.loading = false;
        state.ModelScales = action.payload;
      })
      .addCase(fetchAllModelScales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllModelScales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      })
      .addCase(createModelScale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createModelScale.fulfilled, (state, action: PayloadAction<ScaleData>) => {
        state.loading = false;
        state.ModelScales.push(action.payload);
      })
      .addCase(createModelScale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      });
  },
});

export const ModelScaleReducer = ModelScaleSlice.reducer;
