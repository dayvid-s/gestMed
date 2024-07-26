import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MainScaleBackendModel } from "../@types/scaleTypes";
import { api } from "../services/axiosClient";

type MainScaleState = {
  mainScale: MainScaleBackendModel[];
  loading: boolean;
  error: string | null;
};

const initialState: MainScaleState = {
  mainScale: [],
  loading: false,
  error: null,
};

export const fetchMainScale = createAsyncThunk<MainScaleBackendModel[], void, { rejectValue: string }>(
  "mainScale/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<MainScaleBackendModel[]>("/scales/main");
      if (response.status < 300) {
        return response.data;
      } else {
        console.error("Falha ao obter escala principal", response);
        return rejectWithValue("Falha ao obter escala principal");
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

export const createMainScale = createAsyncThunk<MainScaleBackendModel, { total_of_scale_days: number; model_scale_id?: number }, { rejectValue: string }>(
  "mainScale/create",
  async ({ total_of_scale_days, model_scale_id }, { rejectWithValue }) => {
    try {
      const response = await api.post("/scales/main", {
        total_of_scale_days,
        model_scale_id,
      });
      if (response.status < 300) {
        console.log("Escala principal criada com sucesso");
        return response.data;
      } else {
        console.error("Falha ao criar escala principal", response);
        return rejectWithValue("Falha ao criar escala principal");
      }
    } catch (error) {
      console.error("Falha ao criar escala principal", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Erro desconhecido");
      }
    }
  }
);

const MainScaleSlice = createSlice({
  name: "mainScale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainScale.fulfilled, (state, action: PayloadAction<MainScaleBackendModel[]>) => {
        state.loading = false;
        state.mainScale = action.payload;
      })
      .addCase(fetchMainScale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainScale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      })
      .addCase(createMainScale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMainScale.fulfilled,
        (state, action: PayloadAction<MainScaleBackendModel>) => {
          state.loading = false;
          state.mainScale.push(action.payload);
        })
      .addCase(createMainScale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      });
  },
});

export const MainScaleReducer = MainScaleSlice.reducer;