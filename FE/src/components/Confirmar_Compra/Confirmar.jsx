import React, { useEffect, useState } from 'react';

function Confirmar() {
  const [CarritoSeleccionado, setCarritoSeleccionado] = useState([]);

  useEffect(() => {
    const DatosCarrito = localStorage.getItem('CarritoSelecccionado');
    if (DatosCarrito) {
      setCarritoSeleccionado(JSON.parse(DatosCarrito));
    }
  }, []);

  const CalcularTotal = () => {
    if (!CarritoSeleccionado || CarritoSeleccionado.length === 0) {
      return 0; // Si el carrito está vacío, el total es 0
    }
    return CarritoSeleccionado.reduce((acc, item) => {
      const precio = item.Precio_total || 0; // Asegúrate de que precio sea un número válido
      const cantidad = item.cantidad || 0; // Asegúrate de que cantidad sea un número válido
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
                <td>{item.id_producto.Nombre_producto || "Sin nombre"}</td>
                <td>₡ {(item.Precio_total || 0).toLocaleString()}</td>
                <td>{item.cantidad || 0}</td>
                <td>
                  ₡{" "}
                  {((item.Precio_total || 0) * (item.cantidad || 0)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel lateral */}
      <div className="panel-lateral">
        

        <div className="comentarios-pedido">
          <p>¿Te gustaría dejar un comentario acerca de tu pedido?</p>
          <textarea
            rows="3"
            placeholder="300 caracteres"
            className="textarea"
          ></textarea>
        </div>

       

        <div className="resumen-total">
          <p>
            <strong>Subtotal:</strong> ₡ {CalcularTotal().toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ₡ {CalcularTotal().toLocaleString()}
          </p>
        </div>

        <button className="boton-finalizar">Finalizar Compra</button>
      </div>
    </div>
  </div>
  );
}

export default Confirmar;
