import Modal from "../Modal";

const DeleteModal = ({ deleteModal, handleClose, uid }) => {
  return (
    <>
      <Modal
        isModalOpen={deleteModal}
        handleClose={handleClose}
        enableClickAway={true}
      >
        <div className="mb-4 text-lg">Are you sure to delete this note?</div>
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
            className="w-[48%] rounded-full py-2 text-white font-bold bg-red-600 hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
