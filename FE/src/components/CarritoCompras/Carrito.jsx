import React, { useState } from "react";
import '../../css/Cart.css'
import Modal from "../Modal/Modal"; // Ajusta la ruta según tu estructura.

const Carrito = () => {
  const [abrirModal, setAbrirModal] = useState(false); // Controla la visibilidad del modal.
 // Dato de ejemplo.




  return (
    
    <div className="">
    <button onClick={() => setAbrirModal(true)} className="">
      <i className=""></i> Agregar promoción
      <Modal
      isOpen={abrirModal}
      onClose={() => setAbrirModal(false)}
     
    />
    </button>

    <Modal
      isOpen={abrirModal}
      onClose={() => setAbrirModal(false)}
  
    />
  </div>
 
  );
};

export default Carrito;
