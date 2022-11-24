import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import classNames from "classnames";

const NoteForm = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const submitForm = () => {
    validateInputs();

    if (titleError) {
      toast.error("Title is required.");
      return;
    }

    if (bodyError) {
      toast.error("Word Limit has been reached.");
      return;
    }

    axios({
      method: "post",
      url: "/api/notes",
      data: {
        title: title,
        body: body,
      },
    })
      .then((response) => {
        resetForm();
        toast.success("Note saved.");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setWordCount(0);
    setTitleError(false);
    setBodyError(false);
  };

  const checkWordCount = (e) => {
    let bodyValue = e.target.value;

    setBody(bodyValue);
    setWordCount(bodyValue === "" ? 0 : bodyValue.split(" ").length);
  };

  const validateInputs = () => {
    setTitleError(!title);
    setBodyError(!body || wordCount > 200);
  };

  return (
    <div>
      <form
        className="w-full flex flex-col"
        onBlur={() => {
          setTitleError(false);
          setBodyError(false);
        }}
      >
        <div className="mb-2">
          <div className="flex flex-row justify-between">
            <label className="text-white font-semibold mb-2">Title</label>
            <button
              className="cursor-pointer hover:font-bold mb-2"
              onClick={(e) => {
                e.preventDefault();
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
                "text-amber-600": wordCount >= 150,
                "text-red-600": wordCount > 200,
              })}
            >
              {wordCount}/200
            </span>
          </label>
          <textarea
            aria-label="Type your notes here..."
            className={classNames("textarea w-full", {
              "input-error": bodyError,
            })}
            value={body}
            onChange={(e) => checkWordCount(e)}
            placeholder="Bio"
          ></textarea>
        </div>
      </form>
      <div className="flex flex-row mt-2 justify-between">
        <button
          className="w-[48%] rounded-full py-2 text-black font-bold bg-slate-300 hover:bg-slate-400"
          onClick={handleClose}
        >
          Close
        </button>
        <button
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
