import { DutySolicitation } from "@/@types/dutySolicitationtypes";
import { MainScaleDutyInBackend } from "@/@types/MainScaleDutyTypes";
import { UserData } from "@/@types/userTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/axiosClient";


interface InfoForNewDuty {
  shift: number;
  scale_date: string;
}

interface SolicitationState {
  solicitations: DutySolicitation[];
  loading: boolean;
  error: string | null;
}

const initialState: SolicitationState = {
  solicitations: [],
  loading: false,
  error: null,
};

// Função auxiliar para requisições GET
async function getSolicitations(endpoint: string, rejectWithValue: (value: string) => void) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Erro desconhecido");
    }
  }
}

// Thunks
export const createSolicitationOfExistentDuty = createAsyncThunk<
  DutySolicitation,
  { existentDuty: MainScaleDutyInBackend; user: UserData },
  { rejectValue: string }
>(
  "solicitations/create-with-duty",
  async ({ existentDuty, user }, { rejectWithValue }) => {
    try {
      const response = await api.post("/solicitations/duties/create-with-duty", { existentDuty, user });
      if (response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue("Falha ao criar solicitação");
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
  DutySolicitation,
  { infoForNewDuty: InfoForNewDuty; user: UserData },
  { rejectValue: string }
>(
  "solicitations/create-without-duty",
  async ({ infoForNewDuty, user }, { rejectWithValue }) => {
    try {
      const response = await api.post("/solicitations/duties/create-without-duty", { infoForNewDuty, user });
      if (response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue("Falha ao criar solicitação");
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

export const getAllSolicitations = createAsyncThunk<
  DutySolicitation[],
  void,
  { rejectValue: string }
>(
  "solicitations/getAll",
  async (_, { rejectWithValue }) => {
    return getSolicitations("/solicitations/duties", rejectWithValue);
  }
);

export const getAllSolicitationsFromUser = createAsyncThunk<
  DutySolicitation[],
  { user: UserData },
  { rejectValue: any }
>(
  "solicitations/getAllFromOneUser",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await api.post("/solicitations/duties/user", { user });
      if (response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue("Falha ao buscar solicitações do usuário");
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

const handlePending = (state: SolicitationState) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state: SolicitationState, action: PayloadAction<DutySolicitation[]>) => {
  state.loading = false;
  // state.solicitations = action.payload;
};

const handleFulfilledSingle = (state: SolicitationState, action: PayloadAction<DutySolicitation>) => {
  state.loading = false;
  // state.solicitations.push(action.payload);
};

const handleRejected = (state: SolicitationState, action: PayloadAction<string | undefined>) => {
  state.loading = false;
  state.error = action.payload ?? "Erro desconhecido";
};

const solicitationSlice = createSlice({
  name: "solicitations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createSolicitationOfExistentDuty
      .addCase(createSolicitationOfExistentDuty.pending, handlePending)
      .addCase(createSolicitationOfExistentDuty.fulfilled, handleFulfilledSingle)
      .addCase(createSolicitationOfExistentDuty.rejected, handleRejected)

      // createSolicitationOfNoExistentDuty
      .addCase(createSolicitationOfNoExistentDuty.pending, handlePending)
      .addCase(createSolicitationOfNoExistentDuty.fulfilled, handleFulfilledSingle)
      .addCase(createSolicitationOfNoExistentDuty.rejected, handleRejected)

      // getAllSolicitations
      .addCase(getAllSolicitations.pending, handlePending)
      .addCase(getAllSolicitations.fulfilled, handleFulfilled)
      .addCase(getAllSolicitations.rejected, handleRejected)

      // getAllSolicitationsFromUser
      .addCase(getAllSolicitationsFromUser.pending, handlePending)
      .addCase(getAllSolicitationsFromUser.fulfilled, handleFulfilled)
      .addCase(getAllSolicitationsFromUser.rejected, handleRejected);
  },
});

export const solicitationReducer = solicitationSlice.reducer;