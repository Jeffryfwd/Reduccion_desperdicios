import React from 'react';
import '../../css/Modal.css'

const Modal = ({ isOpen, onClose,children}) => {
  if (!isOpen) return null; // Retorna null si el modal no está abierto.

  return (
    <div className="modal-overlay">
    <div className="modal-side-panel">
      <div className="modal-header">
        <h5 className="modal-title">Mi carrito</h5>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </div>
  </div>
  );
};

export default Modal;