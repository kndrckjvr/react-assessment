import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  setEditNoteId,
  setViewNote,
} from "../../app/features/note/noteSlice";

const NoteForm = ({ handleClose }) => {
  const { editNoteId, viewNoteData } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  // const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (editNoteId != null) {
      axios
        .get(`/api/note/${editNoteId}`)
        .then((response) => {
          let data = response.data;
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      resetForm();
    }
  }, [editNoteId]);

  const submitForm = () => {
    if (title === "") {
      setTitleError(true);
      toast.error("Title is required.");
      return;
    }

    if (body === "" || characterCount > 200) {
      setBodyError(true);
      toast.error("Word Limit has been reached.");
      return;
    }

    axios({
      method: editNoteId == null ? "post" : "patch",
      url: editNoteId == null ? "/api/note" : `/api/note/${editNoteId}`,
      data: {
        title: title,
        body: body,
      },
    })
      .then((response) => {
        resetForm();
        handleClose();
        dispatch(getNotes());

        // if view note is not null refresh data
        if (viewNoteData !== null && editNoteId !== null) {
          dispatch(setViewNote(response.data));
          dispatch(setEditNoteId(null));
        }

        toast.success(editNoteId == null ? "Note saved." : "Note updated.");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    // setWordCount(0);
    setCharacterCount(0);
    setTitleError(false);
    setBodyError(false);
  };

  const checkBodyInput = (e) => {
    let bodyValue = e.target.value;

    setBody(bodyValue);
    // setWordCount(bodyValue === "" ? 0 : bodyValue.split(" ").length);
    setCharacterCount(bodyValue === "" ? 0 : bodyValue.length);
  };

  return (
    <div>
      <form className="w-full flex flex-col">
        <div className="mb-2">
          <div className="flex flex-row justify-between">
            <label className="text-white font-semibold mb-2">Title</label>
            <button
              type="button"
              className="cursor-pointer hover:font-bold mb-2"
              onClick={(e) => {
                resetForm();
              }}
            >
              <FontAwesomeIcon icon="trash-can" />
              <span className="px-3">Reset</span>
            </button>
          </div>
          <input
            aria-label="Title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Type title here..."
            className={classNames("input w-full", {
              "input-error": titleError,
            })}
          />
        </div>
        <div className="mb-2 w-full">
          <label className="text-white font-semibold mb-2 flex flex-row">
            Note
            <span
              className={classNames("ml-auto text-xs self-center", {
                "text-amber-600": characterCount >= 150,
                "text-red-600": characterCount > 200,
              })}
            >
              {characterCount}/200
            </span>
          </label>
          <textarea
            aria-label="Body"
            className={classNames("textarea w-full", {
              "input-error": bodyError,
            })}
            value={body}
            onChange={(e) => checkBodyInput(e)}
            placeholder="Type your notes here..."
          ></textarea>
        </div>
      </form>
      <div className="flex flex-row mt-2 justify-between">
        <button
          type="button"
          className="w-[48%] rounded-full py-2 text-black font-bold bg-slate-300 hover:bg-slate-400"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="w-[48%] rounded-full py-2 text-white font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8]"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
