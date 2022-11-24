import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  noteItems: [],
  count: 0,
  isLoading: true,
  editNoteId: null,
  viewNoteData: null,
  isViewLoading: true,
  deleteNoteId: null,
};

export const getNotes = createAsyncThunk(
  "note/getNotes",
  async (search, thunkApi) => {
    try {
      const response = await axios.get("/api/note", {
        params: {
          search: search,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error.message);
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getNote = createAsyncThunk(
  "note/getNote",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(`/api/note/${id}`);

      return response.data;
    } catch (error) {
      console.error(error.message);
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`/api/note/${id}`);

      return response.data;
    } catch (error) {
      console.error(error.message);
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleViewLoading: (state, action) => {
      state.isViewLoading = action.payload;
    },
    setNotes: (state, { payload }) => {
      state.noteItems = payload;
    },
    setEditNoteId: (state, { payload }) => {
      state.editNoteId = payload;
    },
    setViewNote: (state, { payload }) => {
      state.viewNoteData = payload;
    },
    setDeleteNoteId: (state, { payload }) => {
      state.deleteNoteId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.noteItems = action.payload;
      })
      .addCase(getNotes.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.viewNoteData = action.payload;
        state.isViewLoading = false;
      })
      .addCase(getNote.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.deleteNoteId = null;
        toast.success("Note has been deleted");
      })
      .addCase(deleteNote.rejected, (state, { payload }) => {
        toast.error(payload.message);
      });
  },
});

export const {
  toggleLoading,
  setNotes,
  setEditNoteId,
  setViewNote,
  setDeleteNoteId,
  toggleViewLoading,
} = noteSlice.actions;

export default noteSlice.reducer;
