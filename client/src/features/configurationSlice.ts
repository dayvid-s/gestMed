import { configurationType } from "@/@types/configurationTypes";
import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConfigurationState = {
  loading: boolean;
  error: string | null;
  configurations: configurationType | null;
};

const initialState: ConfigurationState = {
  loading: false,
  error: null,
  configurations: null,
};

export const fetchConfiguration = createAsyncThunk<
  configurationType,
  void,
  { rejectValue: string }
>("configuration/fetchConfiguration", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/configurations/1");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Erro desconhecido");
    }
  }
});

export const updateConfiguration = createAsyncThunk<
  configurationType,
  { should_cordinator_aprove_duties: boolean },
  { rejectValue: string }
>(
  "configuration/updateConfiguration",
  async ({ should_cordinator_aprove_duties }, { rejectWithValue }) => {
    try {
      const response = await api.put("/configurations/1", { should_cordinator_aprove_duties });
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

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfiguration.fulfilled, (state, action: PayloadAction<configurationType>) => {
        state.loading = false;
        state.configurations = action.payload;
      })
      .addCase(fetchConfiguration.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Erro ao buscar configuração";
      })
      .addCase(updateConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfiguration.fulfilled, (state, action: PayloadAction<configurationType>) => {
        state.loading = false;
        state.configurations = action.payload;
      })
      .addCase(updateConfiguration.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Erro ao atualizar configuração";
      });
  },
});

export const configurationReducer = configurationSlice.reducer;
