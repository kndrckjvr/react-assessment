import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    openDeleteModal: (state) => {
      state.isModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
