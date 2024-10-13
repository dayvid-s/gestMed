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
  scale_date: string;
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

// Função auxiliar para fazer a solicitação à API
async function postSolicitation<T>(
  endpoint: string,
  payload: T,
  rejectWithValue: (value: string) => void
) {
  try {
    const response = await api.post(endpoint, payload);
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
  SolicitationOfDuty,
  { existentDuty: MainScaleDutyInBackend; user: UserData },
  { rejectValue: string }
>(
  "solicitations/create-with-duty",
  async ({ existentDuty, user }, { rejectWithValue }) => {
    return postSolicitation("/solicitations/duties/create-with-duty", { existentDuty, user }, rejectWithValue);
  }
);

export const createSolicitationOfNoExistentDuty = createAsyncThunk<
  SolicitationOfDuty,
  { infoForNewDuty: InfoForNewDuty; user: UserData },
  { rejectValue: string }
>(
  "solicitations/create-without-duty",
  async ({ infoForNewDuty, user }, { rejectWithValue }) => {
    return postSolicitation("/solicitations/duties/create-without-duty", { infoForNewDuty, user }, rejectWithValue);
  }
);

export const getAllSolicitations = createAsyncThunk<
  SolicitationOfDuty[],
  void,
  { rejectValue: string }
>(
  "solicitations/getAll",
  async (_, { rejectWithValue }) => {
    return getSolicitations("/solicitations/duties", rejectWithValue);
  }
);

export const getAllSolicitationsFromUser = createAsyncThunk<
  SolicitationOfDuty[],
  { user: UserData },
  { rejectValue: string }
>(
  "solicitations/getAllFromOneUser",
  async ({ user }, { rejectWithValue }) => {
    return postSolicitation("/solicitations/duties/user", { user }, rejectWithValue);
  }
);

const handlePending = (state: SolicitationState) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state: SolicitationState, action: PayloadAction<SolicitationOfDuty[]>) => {
  state.loading = false;
  // state.solicitations = action.payload;
};

const handleFulfilledSingle = (state: SolicitationState, action: PayloadAction<SolicitationOfDuty>) => {
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