import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as dayjs from "dayjs";
import imagePlaceholder from "../../images/edit-placeholder.png";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getNote,
  setEditNoteId,
  setViewNote,
} from "../../app/features/note/noteSlice";
import { openModal } from "../../app/features/modal/formModalSlice";
import DeleteModal from "./DeleteModal";

const NoteView = () => {
  const dispatch = useDispatch();
  const { viewNoteData } = useSelector((state) => state.note);
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClose = () => {
    setDeleteModal(false);
  };

  const editNote = (e, uid) => {
    e.stopPropagation();

    dispatch(setEditNoteId(uid));
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(getNote(id));

    return () => {
      dispatch(setViewNote(null));
    };
  }, []);

  if (!viewNoteData) return <Loading />;

  return (
    <div className="p-8 max-w-full">
      <div className="flex flex-column">
        <div className="flex flex-row mb-4">
          <img
            src={imagePlaceholder}
            alt=""
            className="rounded-full h-14 w-14 inline-block mr-2"
          />
          <div className="text-3xl mb-2">{viewNoteData.title}</div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="max-w-2xl break-words text-lg">{viewNoteData.body}</div>
      </div>
      <div className="text-slate-300 py-4">
        {dayjs(viewNoteData.created_at).format("h:mm A · MMM D, YYYY")} ·
        ReactJS Assessment{" "}
        {viewNoteData.updated_at != null
          ? `· Last Edited: ${dayjs(viewNoteData.created_at).format(
              "MMM D, YYYY h:mm A"
            )}`
          : null}
      </div>
      <div className="border-y-[1px] border-y-slate-700 py-4 flex flex-row justify-around">
        <button
          type="button"
          onClick={(e) => {
            editNote(e, id);
          }}
          className="hover:text-slate-400 cursor-pointer"
        >
          <FontAwesomeIcon icon="pen" />
        </button>
        <button
          type="button"
          className="hover:text-slate-400 cursor-pointer"
          onClick={() => setDeleteModal(true)}
        >
          <FontAwesomeIcon icon="trash-can" />
        </button>
      </div>
      <DeleteModal
        deleteModal={deleteModal}
        handleClose={handleClose}
        uid={id}
      />
    </div>
  );
};

export default NoteView;
