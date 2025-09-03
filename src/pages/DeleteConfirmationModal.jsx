// DeleteConfirmationModal.jsx

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaExclamationTriangle className="modal-icon" />
        <h2 className="modal-title">Confirm</h2>
        <p className="modal-message">Are you sure want to permanently delete this Audio pack?</p>
        <div className="modal-actions">
          <button className="btn-yes-delete" onClick={onConfirm}>
            YES DELETE
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
