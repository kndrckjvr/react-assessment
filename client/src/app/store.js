import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/note/noteSlice";
import formModalReducer from "./features/modal/formModalSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    formModal: formModalReducer,
  },
});
