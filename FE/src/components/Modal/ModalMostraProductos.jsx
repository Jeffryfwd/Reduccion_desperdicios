import React from 'react';
import '../../css/Modal.css'

const ModalMostraProductos= ({ isOpen, onClose,children}) => {
  if (!isOpen) return null; // Retorna null si el modal no está abierto.

  return (
    <div className="modal-overlay-Mostrar-producto">
    <div className="modal-side-panel-Mostar-producto">
      <div className="modal-header1-mostrar-producto">
        <h5 className="modal-title-mostar-producto">Productos Comprado en esta fecha</h5>
        <button className="close-button1" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </div>
  </div>
  );
};

export default ModalMostraProductos