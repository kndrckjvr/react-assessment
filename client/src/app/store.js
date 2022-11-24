import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/note/noteSlice";
import formModalReducer from "./features/modal/formModalSlice";
import deleteModalReducer from "./features/modal/deleteModalSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    formModal: formModalReducer,
    deleteModal: deleteModalReducer,
  },
});
