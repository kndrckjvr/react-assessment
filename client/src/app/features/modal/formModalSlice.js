import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const formModalSlice = createSlice({
  name: "formModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = formModalSlice.actions;

export default formModalSlice.reducer;
