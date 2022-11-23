import { useState } from "react";
import Modal from "../Modal";
import NoteForm from "../note/NoteForm";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-black sticky top-0 h-screen basis-1/4 border-r-[1px] border-r-slate-700">
        <div className="w-3/4 ml-auto">
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
            className="py-2 w-[95%] rounded-full mx-auto font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8]"
            onClick={createNewPost}
          >
            Create New
          </button>
        </div>
      </div>
      <Modal
        isModalOpen={modalOpen}
        handleClose={handleClose}
        enableClickAway={true}
      >
        <NoteForm handleClose={handleClose}></NoteForm>
      </Modal>
    </>
  );
};

export default Sidebar;
