import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../app/features/modal/formModalSlice";
import Modal from "../Modal";
import NoteForm from "../note/NoteForm";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.formModal);
  const links = [
    {
      title: "Home",
      icon: "house",
      path: "/",
    },
    {
      title: "Search",
      icon: "magnifying-glass",
      path: "/search",
    },
  ];

  const createNewPost = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className="bg-black sticky top-0 h-screen basis-1/4 border-r-[1px] border-r-slate-700">
        <div className="w-3/4 ml-auto flex flex-col">
          <ul className="mt-4 mb-4">
            {links.map((link, index) => (
              <SidebarLinks
                key={index}
                title={link.title}
                path={link.path}
                icon={link.icon}
              />
            ))}
          </ul>
          <button
            type="button"
            className="py-4 w-11/12 rounded-full font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8] self-center"
            onClick={createNewPost}
          >
            Create New
          </button>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        enableClickAway={true}
      >
        <NoteForm handleClose={handleClose}></NoteForm>
      </Modal>
    </>
  );
};

export default Sidebar;
