import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { closeDeleteModal } from "../../app/features/modal/deleteModalSlice";
import {
  deleteNote,
  getNotes,
  setDeleteNoteId,
  setViewNote,
} from "../../app/features/note/noteSlice";
import Modal from "../Modal";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen } = useSelector((state) => state.deleteModal);
  const { deleteNoteId, viewNoteData } = useSelector((state) => state.note);

  const handleClose = () => {
    dispatch(closeDeleteModal());
    dispatch(setDeleteNoteId(null));
  };

  const handleNoteDelete = () => {
    dispatch(deleteNote(deleteNoteId));
    handleClose();
    dispatch(getNotes());

    if (viewNoteData != null) {
      dispatch(setViewNote(null));
      navigate("/");
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      handleClose={handleClose}
      enableClickAway={true}
    >
      <div className="mb-4 text-lg">Are you sure to delete this note?</div>
      <div className="flex flex-row mt-2 justify-between">
        <button
          autoFocus
          type="button"
          className="w-[48%] rounded-full py-2 text-black font-bold bg-slate-300 hover:bg-slate-400"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="w-[48%] rounded-full py-2 text-white font-bold bg-red-600 hover:bg-red-700"
          onClick={handleNoteDelete}
        >
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
