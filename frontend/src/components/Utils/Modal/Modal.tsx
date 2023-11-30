import "./Modal.scss";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { GrClose } from "../../../assets/svg/svgIcons";

interface ModalProps {
  modalButton: React.ReactElement;
  modalTitle: string;
  modalContent: React.ReactElement;
  modalFooterButton: React.ReactElement;
  modalFooterClass?: string;
  onClick?: () => void;
  modalCancel?: boolean;
  className?: string;
  modalButtonClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  className,
  modalButton,
  modalTitle,
  modalContent,
  modalFooterButton,
  modalFooterClass,
  onClick,
  modalCancel = true,
  modalButtonClass,
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleOpenModal() {
    if (onClick) {
      onClick();
    }
    setShowConfirmDialog(true);
  }

  function handleCloseModal() {
    setShowConfirmDialog(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Escape" || event.code === "Delete") {
      handleCloseModal();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleModalClick(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowConfirmDialog(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClick);

    return () => {
      document.removeEventListener("mousedown", handleModalClick);
    };
  }, []);

  return (
    <>
      <button
        className={`modalButton ${modalButtonClass ?? ""}`}
        onClick={handleOpenModal}
        type="button"
      >
        {modalButton}
      </button>

      {ReactDOM.createPortal(
        showConfirmDialog && (
          <div className={`modalContainer ${className ?? ""}`}>
            <div className="modal" ref={modalRef}>
              {modalTitle !== "" ? (
                <div className="modalTitle">{modalTitle}</div>
              ) : (
                <GrClose className="grClose" onClick={handleCloseModal} />
              )}

              <div>{modalContent}</div>
              <div
                className={`buttonWrapper ${
                  modalFooterClass ? modalFooterClass : ""
                }`}
              >
                {modalFooterButton}
                {modalCancel && (
                  <button
                    onClick={handleCloseModal}
                    className="cancelButton"
                    id="cancelModalButton"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ),
        document.getElementById("root")!,
      )}
    </>
  );
};

export default Modal;
