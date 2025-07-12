import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose, width = "max-w-sm" }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white p-4 rounded-md w-full ${width}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modalRoot")
  );
};

export default Modal;
