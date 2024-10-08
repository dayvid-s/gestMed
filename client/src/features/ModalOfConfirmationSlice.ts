import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeOfModal = 'Delete' | 'Create';

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: TypeOfModal;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  message: '',
  type: 'Delete',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = '';
      state.message = '';
      state.type = 'Delete';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const ModalOfConfirmationSlice = modalSlice.reducer;