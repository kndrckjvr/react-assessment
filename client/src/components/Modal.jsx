import classNames from "classnames";
import { useRef } from "react";
import { useClickAway } from "react-use";

const Modal = ({ isModalOpen, handleClose, enableClickAway, children }) => {
  const modalRef = useRef(null);
  useClickAway(modalRef, () => {
    if (enableClickAway) {
      handleClose();
    }
  });

  return (
    <section
      className={classNames("modal", {
        "modal-open": isModalOpen,
      })}
    >
      <div className="modal-box relative flex flex-col bg-black shadow-md shadow-slate-500" ref={modalRef}>
        {children}
      </div>
    </section>
  );
};

export default Modal;
