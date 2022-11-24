import imagePlaceholder from "../../images/edit-placeholder.png";
import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setDeleteNoteId,
  setEditNoteId,
} from "../../app/features/note/noteSlice";
import { openFormModal } from "../../app/features/modal/formModalSlice";
import { openDeleteModal } from "../../app/features/modal/deleteModalSlice";

const Note = ({ uid, title, created_at, updated_at, body, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewNote = (e, uid) => {
    e.stopPropagation();
    navigate(`/view/${uid}`);
  };

  const editNote = (e, uid) => {
    e.stopPropagation();
    dispatch(setEditNoteId(uid));
    dispatch(openFormModal());
  };

  const deleteNote = (e, uid) => {
    e.stopPropagation();

    dispatch(setDeleteNoteId(uid));
    dispatch(openDeleteModal());
  };

  return (
    <div className="border-b-[1px] border-b-slate-700 p-3">
      <div className="flex flex-row">
        <img
          src={imagePlaceholder}
          alt=""
          className="rounded-full h-10 w-10 inline-block"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center ml-2">
            <button
              type="button"
              className="text-s truncate max-w-[500px] hover:underline cursor-pointer"
              onClick={(e) => viewNote(e, uid)}
            >
              {title}
            </button>
            <div className="px-2">·</div>
            <span className="text-xs font-bold text-slate-500">
              {dayjs(created_at).format("YYYY/MM/DD HH:mm:ss")}
            </span>

            <div className="dropdown dropdown-end ml-auto">
              <div
                tabIndex={0}
                className="rounded-full text-center cursor-pointer h-7 w-7 p-1 fill-slate-200 hover:bg-slate-600 hover:fill-[#1d9bf0]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="">
                  <g>
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                  </g>
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-black rounded-box w-52 text-white"
              >
                <li>
                  <button
                    type="button"
                    className="active:bg-slate-300"
                    onClick={(e) => viewNote(e, uid)}
                  >
                    View
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="active:bg-slate-300"
                    onClick={(e) => editNote(e, uid)}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="active:bg-slate-300"
                    onClick={(e) => deleteNote(e, uid)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-1 mb-2 px-2 max-w-2xl break-words">{body}</div>
        </div>
      </div>
    </div>
  );
};

export default Note;
