import React from "react";
import "./Modal.css";

const Modal = ({ body, setOpenModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          <div className="modal-close" onClick={() => setOpenModal("")}>
            close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
