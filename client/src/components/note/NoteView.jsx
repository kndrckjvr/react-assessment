import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as dayjs from "dayjs";
import imagePlaceholder from "../../images/edit-placeholder.png";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";

const NoteView = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    axios
      .get(`/api/notes/${id}`)
      .then((response) => {
        setNote(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  if (!note) return <Loading />;

  return (
    <div className="p-8 max-w-full">
      <div className="flex flex-column">
        <div className="flex flex-row mb-4">
          <img
            src={imagePlaceholder}
            alt=""
            className="rounded-full h-14 w-14 inline-block mr-2"
          />
          <div className="text-3xl mb-2">{note.title}</div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="max-w-2xl break-words text-lg">{note.body}</div>
      </div>
      <div className="text-slate-300 py-4">
        {dayjs(note.created_at).format("h:mm A · MMM D, YYYY")} · ReactJS
        Assessment
      </div>
      <div className="border-y-[1px] border-y-slate-700 py-4 flex flex-row justify-around">
        <div className="hover:text-slate-400 cursor-pointer">
          <FontAwesomeIcon icon="pen" />
        </div>
        <div
          className="hover:text-slate-400 cursor-pointer"
          onClick={() => setDeleteModal(true)}
        >
          <FontAwesomeIcon icon="trash-can" />
        </div>
      </div>
      <Modal
        isModalOpen={deleteModal}
        handleClose={handleClose}
        enableClickAway={true}
      >
        <div className="mb-4 text-lg">Are you sure to delete this note?</div>
        <div className="flex flex-row mt-2 justify-between">
          <button
            className="w-[48%] rounded-full py-2 text-black font-bold bg-slate-300 hover:bg-slate-400"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="w-[48%] rounded-full py-2 text-white font-bold bg-red-600 hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NoteView;
