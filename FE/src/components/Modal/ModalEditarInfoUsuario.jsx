import React from 'react';
import '../../css/Modal.css'

const ModalEditarInfoUsuario = ({ isOpen, onClose,children}) => {
  if (!isOpen) return null; // Retorna null si el modal no está abierto.

  return (
    <div className="modal-overlay1">
    <div className="modal-side-panel1">
      <div className="modal-header1">
        <h5 className="modal-title1">Edita tu informacion personal</h5>
        <button className="close-button1" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </div>
  </div>
  );
};

export default ModalEditarInfoUsuario;