import { MainScaleDuty, MainScaleDutyInBackend } from "@/@types/MainScaleDutyTypes";
import { UserData } from "@/@types/userTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/axiosClient";

type SolicitationStatus = "approved" | "in progress";
interface SolicitationOfDuty {
  id?: number;
  status: SolicitationStatus;
  message: string;
  existentDuty?: MainScaleDuty;
  user: UserData;
}

interface InfoForNewDuty {
  shift: number;
  scale_date: number;
}

interface SolicitationState {
  solicitations: SolicitationOfDuty[];
  loading: boolean;
  error: string | null;
}

const initialState: SolicitationState = {
  solicitations: [],
  loading: false,
  error: null,
};

export const createSolicitationOfExistentDuty = createAsyncThunk<
  SolicitationOfDuty,
  { existentDuty: MainScaleDutyInBackend; user: UserData },
  { rejectValue: string }
>(
  "solicitations/create-with-duty",
  async ({ existentDuty, user }, { rejectWithValue }) => {
    try {
      const response = await api.post("/solicitations/duties/create-with-duty", {
        existentDuty,
        user,
      });
      if (response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue("Falha ao criar solicitação de plantão existente");
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

export const createSolicitationOfNoExistentDuty = createAsyncThunk<
  SolicitationOfDuty,
  { infoForNewDuty: InfoForNewDuty; user: UserData },
  { rejectValue: string }
>(
  "solicitations/create-without-duty",
  async ({ infoForNewDuty, user }, { rejectWithValue }) => {
    try {
      const response = await api.post("/solicitations/duties/create-without-duty", {
        infoForNewDuty,
        user,
      });
      if (response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue("Falha ao criar solicitação de plantão inexistente");
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

const solicitationSlice = createSlice({
  name: "solicitations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSolicitationOfExistentDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSolicitationOfExistentDuty.fulfilled,
        (state, action: PayloadAction<SolicitationOfDuty>) => {
          state.loading = false;
          state.solicitations.push(action.payload);
        }
      )
      .addCase(createSolicitationOfExistentDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      });

    builder
      .addCase(createSolicitationOfNoExistentDuty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSolicitationOfNoExistentDuty.fulfilled,
        (state, action: PayloadAction<SolicitationOfDuty>) => {
          state.loading = false;
          state.solicitations.push(action.payload);
        }
      )
      .addCase(createSolicitationOfNoExistentDuty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      });
  },
});

export const solicitationReducer = solicitationSlice.reducer;