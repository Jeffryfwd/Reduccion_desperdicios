import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

function Confirmar() {
  const [CarritoSeleccionado, setCarritoSeleccionado] = useState([]);
  const [Cliente_id, setCliente] = useState("");
  const navigate = useNavigate();
 const [mostrarInput, setMostrarInput]=useState(false); 
  useEffect(() => {
    const DatosCarrito = localStorage.getItem('CarritoSelecccionado');
    const Id= localStorage.getItem('Id_user')
    if (DatosCarrito) {
      setCarritoSeleccionado(JSON.parse(DatosCarrito));
    }
    if (Id) {
      setCliente(Id)
    }
  }, []);

  const confirmarCompra = async () => {
   

    const datosCompra = {
      Cliente_id,
      carrito: CarritoSeleccionado,
    };

    console.log(datosCompra);
    

    try {
      const response = await fetch('http://127.0.0.1:8000/api/rventa/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCompra),
      });

      if (response.ok) {
        alert('Compra registrada con éxito');
        localStorage.removeItem('CarritoSeleccionado');
        navigate('/visualizacion/promociones'); // Redirige a la página principal
   
      } else {
        alert('Error al registrar la compra');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red al registrar la compra');
    }
  };

  const CalcularTotal = () => {
    if (!CarritoSeleccionado || CarritoSeleccionado.length === 0) {
      return 0; // Si el carrito está vacío, el total es 0
    }
    return CarritoSeleccionado.reduce((acc, item) => {
      const precio = item.Precio_total || item.Precio || 0; 
      const cantidad = item.cantidad || 0; 
      return acc + precio * cantidad;
    }, 0);
  };

  return (
    <div className="carrito-container">
      <h1 className="titulo-carrito">Resumen de tu compra</h1>

      <div className="carrito-contenido">
        {/* Tabla de productos */}
        <div className="tabla-productos-container">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {CarritoSeleccionado.map((item) => (
                <tr key={item.id}>
                  <td>{item.id_producto?.Nombre_producto || item.Nombre_producto || "Sin nombre"}</td>
                  <td>₡ {(item.Precio_total || item.Precio || 0).toLocaleString()}</td>
                  <td>{item.cantidad || 0}</td>
                  <td>₡ {(item.Precio_total || item.Precio || 0) * (item.cantidad || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel lateral */}
        <div className="panel-lateral">
          <div className="resumen-total">
          <div className="panel-lateral p-4 bg-light rounded shadow-sm">
  <div className="resumen-total mb-4">
    <h3 className="text-center">Selecciona el método de compra</h3>
    <hr />
  </div>

  <form>
    {/* Opción Sinpe Móvil */}
    <div className="form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="sinpeCheckbox"
        checked={mostrarInput}
        onChange={() => setMostrarInput(!mostrarInput)} // Cambia el estado al hacer clic
      />
      <label className="form-check-label" htmlFor="sinpeCheckbox">
        Sinpe Móvil
      </label>

      {mostrarInput && (
        <div className="mt-3">
          <label htmlFor="comprobanteSinpe" className="form-label">
            Envía el comprobante:
          </label>
          <input
            type="file"
            className="form-control"
            id="comprobanteSinpe"
            placeholder="Selecciona tu archivo..."
          />
        </div>
      )}
    </div>

    {/* Opción PayPal */}
    <div className="form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="paypalCheckbox"
      />
      <label className="form-check-label" htmlFor="paypalCheckbox">
        PayPal
      </label>
    </div>

    {/* Botón Finalizar */}
    <button
      type="submit"
      className="btn btn-success w-100 mt-3"
      // onClick={(e) => {
      //   e.preventDefault();
      //   confirmarCompra(); // Reemplaza con tu función de finalizar compra
      // }}
    >
      Subir Comprobante
    </button>
  </form>
</div>


            <p>
              <strong>Subtotal:</strong> ₡ {CalcularTotal().toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong> ₡ {CalcularTotal().toLocaleString()}
            </p>
          </div>
        

          <button
            className="boton-finalizar"
            onClick={(e) => {
              e.preventDefault(); // Prevenir la recarga de la página
              confirmarCompra();
            }}
          >
            Finalizar Compra
          </button>
        </div>
       
       

         
       
      </div>
    </div>
  );
}

export default Confirmar;
