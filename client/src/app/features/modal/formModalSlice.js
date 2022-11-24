import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const formModalSlice = createSlice({
  name: "formModal",
  initialState,
  reducers: {
    openFormModal: (state) => {
      state.isModalOpen = true;
    },
    closeFormModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openFormModal, closeFormModal } = formModalSlice.actions;

export default formModalSlice.reducer;
