import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const NoteForm = ({ handleClose }) => {
  let titleRef = useRef(null);
  let bodyRef = useRef(null);

  const submitForm = () => {
    axios({
      method: "post",
      url: "/api/notes",
      data: {
        title: titleRef.current.value,
        body: bodyRef.current.value,
      },
    }).then(() => {
      resetForm();
      toast.success("saved.");
    });
  };

  const resetForm = () => {
    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  return (
    <div>
      <form className="w-full flex flex-col">
        <div className="mb-2">
          <div className="flex flex-row justify-between">
            <p className="text-white font-semibold mb-2">Title</p>
            <div className="cursor-pointer hover:font-bold" onClick={resetForm}>
              <FontAwesomeIcon icon="trash" />
              <span className="px-3">Reset</span>
            </div>
          </div>
          <input
            type="text"
            ref={titleRef}
            placeholder="Type here"
            className="input w-full"
          />
        </div>
        <div className="mb-2 w-full">
          <p className="text-white font-semibold mb-2">Note</p>
          <textarea
            className="textarea w-full"
            ref={bodyRef}
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
