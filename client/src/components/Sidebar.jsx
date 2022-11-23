import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import NoteForm from "./note/NoteForm";

let Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const createNewPost = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-black position-fixed top-0 h-screen basis-1/4 border-r-[1px] border-r-slate-700">
        <div className="w-3/4 ml-auto">
          <ul className="mt-4 mb-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
            >
              <li className="mb-3 text-left mx-3">
                <div className="h-full rounded-full p-2 px-6 hover:bg-slate-800 transition-all duration-300">
                  <FontAwesomeIcon icon="house" />
                  <span className="px-3">Home</span>
                </div>
              </li>
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
            >
              <li className="mb-3 text-left mx-3">
                <div className="h-full rounded-full p-2 px-6 hover:bg-slate-800 transition-all duration-300">
                  <FontAwesomeIcon icon="magnifying-glass" />
                  <span className="px-3">Search</span>
                </div>
              </li>
            </NavLink>
          </ul>
          <button
            className="py-2 w-[95%] rounded-full mx-auto font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8]"
            onClick={createNewPost}
          >
            Create New
          </button>
        </div>
      </div>
      <Modal isModalOpen={modalOpen} handleClose={handleClose} enableClickAway={true}>
        <NoteForm handleClose={handleClose}></NoteForm>
      </Modal>
    </>
  );
};

export default Sidebar;
