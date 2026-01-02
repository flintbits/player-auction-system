import React from "react";
import ReactDOM from "react-dom";
import Confetti from "react-confetti";

const Modal = ({ children, onClose, width = "max-w-sm", showConfetti }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-45 flex items-center justify-center bg-black/50 px-3 sm:px-6"
      onClick={onClose}
    >
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti />
        </div>
      )}
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
