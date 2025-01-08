import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import ModalMetodoPago from '../Modal/ModalMetodoPago';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import FormPaypal from '../Paypal/FormPaypal';
import { Link } from 'react-router-dom';
import BotonPerfil from '../BotonPerfil/BotonPerfil';
import Footer from '../Footer/Footer';
import { Alert } from 'react-bootstrap'


function Confirmar() {
  // Definición de estados
  const [CarritoSeleccionado, setCarritoSeleccionado] = useState([]); 
  const [Cliente_id, setCliente] = useState(""); 
  const [Comprobante, setComprobante] = useState(""); 
  const [NombreUsuario, setUserName] = useState(""); 
  const navigate = useNavigate(); 
  const [mostrarInput, setMostrarInput] = useState(false); 
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' }); 

 
  useEffect(() => {
    // Recupera información del localStorage.
    const DatosCarrito = localStorage.getItem('CarritoSelecccionado'); // Recupera el carrito seleccionado.
    const comprobante = localStorage.getItem('Comprobante'); // Recupera el comprobante almacenado.
    const Id = localStorage.getItem('Id_user'); // Recupera el ID del usuario.
    const UserName = localStorage.getItem("UserName"); // Recupera el nombre de usuario.

    // Asigna los datos recuperados al estado si están presentes.
    if (DatosCarrito) {
      setCarritoSeleccionado(JSON.parse(DatosCarrito)); // Convierto el carrito en formato JSON.
    }
    if (Id) {
      setCliente(Id); // Asigno el ID del cliente.
    }
    if (comprobante) {
      setComprobante(comprobante); // Asigno el comprobante de pago.
    
    }
    if (UserName) {
      setUserName(UserName); // Asigno el nombre del usuario.
    }
  }, []); // Se ejecuta solo una vez al cargar el componente.

  // Función para confirmar la compra.
  const confirmarCompra = async () => {
    // Estructura los datos necesarios para la compra.
    const datosCompra = {
      Cliente_id, // ID del cliente.
      carrito: CarritoSeleccionado, // Productos seleccionados en el carrito.
      Comprobante, // Comprobante de pago.
    };

    console.log(datosCompra); // Muestra los datos de la compra en consola.

    // Valida si hay comprobante antes de proceder.
    if (!Comprobante) {
      return setAlert({ show: true, message: '¡Debes realizar el pago para Efectuar tu compra!' }); // Alerta si no hay comprobante.
    }

    try {
      // Envía los datos de la compra al servidor.
      const response = await fetch('http://127.0.0.1:8000/api/rventa/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(datosCompra), 
      });

      // Manejo la respuesta del servidor.
      if (response.ok) {
        setAlert({ show: true, message: '¡Compra realizada exitosamente!' }); // Alerta de éxito.
        generarFactura(); // Genera la factura en PDF.
        localStorage.removeItem('CarritoSeleccionado'); // Elimina el carrito almacenado localmente.
        setTimeout(() => {
          navigate('/'); // Redirige a la página principal después de 3 segundos.
        }, 3000);
      } else {
        setAlert({ show: true, message: '¡Hubo un error al realizar la compra!' }); // Alerta de error.
      }
    } catch (error) {
      console.error('Error:', error); // Muestra el error en consola.
      alert('Error de red al registrar la compra'); // Alerta de error en red.
    }
  };

  // Función para calcular el total del carrito.
  const CalcularTotal = () => {
    // Si no hay productos en el carrito, retorna 0.
    if (!CarritoSeleccionado || CarritoSeleccionado.length === 0) {
      return 0;
    }
    // Calcula el total sumando el precio por la cantidad de cada producto.
    return CarritoSeleccionado.reduce((acc, item) => {
      const precio = item.Precio_total || item.Precio || 0; // Precio del producto.
      const cantidad = item.cantidad || 0; // Cantidad seleccionada.
      return acc + precio * cantidad; // Acumula el total.
    }, 0);
  };

  // Función para generar la factura en formato PDF.
  const generarFactura = () => {
    const doc = new jsPDF(); // Crea un nuevo documento PDF.

    // Encabezado de la factura.
    doc.setFontSize(18);
    doc.text('Factura de Compra', 20, 20); // Título.

    // Información del cliente y la fecha.
    doc.setFontSize(12);
    doc.text(`Nombre Cliente: ${NombreUsuario}`, 20, 40); // Nombre del cliente.
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 50); // Fecha de la factura.

    // Crea la tabla de productos.
    const columnas = ['Producto', 'Precio', 'Cantidad', 'Total']; // Encabezados de tabla.
    const filas = CarritoSeleccionado.map((item) => [
      // Filas de la tabla con información del carrito.
      item.id_producto?.Nombre_producto || item.Nombre_producto || 'Sin nombre', // Nombre del producto.
      `₡ ${(item.Precio_total || item.Precio || 0).toLocaleString()}`, // Precio.
      item.cantidad || 0, // Cantidad.
      `₡ ${((item.Precio_total || item.Precio || 0) * (item.cantidad || 0)).toLocaleString()}`, // Total.
    ]);

    // Usa autoTable para agregar la tabla al PDF.
    doc.autoTable({
      startY: 60,
      head: [columnas],
      body: filas,
    });

    // Muestra el total al final de la factura.
    doc.setFontSize(14);
    doc.text(`Total: ₡ ${CalcularTotal().toLocaleString()}`, 20, doc.lastAutoTable.finalY + 10);

    // Descarga el PDF con un nombre único basado en el tiempo.
    doc.save(`Factura_${new Date().getTime()}.pdf`);
  };

  // Calcula el total del carrito en colones.
  const Total = CalcularTotal();
  console.log('El total es', Total); // Muestra el total en consola.

  // Convierte el total a dólares (asumiendo un tipo de cambio fijo de 512).
  const TotalDolares = Total / 512;


  return (
    <div className="carrito-container">
                 <div className="navbar-categories">
  <ul className="categories-list">{<BotonPerfil/>}

    <li className="category-item">
      <Link to='/'><button className="category-button">Pagina Principal</button></Link>
    </li>
 <li className="category-item">
      <Link to='/acercade'><button className="category-button">Acerca de nosotros</button></Link>
    </li>
<li className="category-item">
      <Link to='/contactenos'><button className="category-button">Contactenos</button></Link>
    </li>
    
   
<li className="carrito-item"></li>
</ul>
</div>
           <div className=' Alerta'>
               {alert.show && (
                   <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                     {alert.message}
                   </Alert>
                 )}  
               </div>
      <div className="resumen-compra-container">
  <h3 className="titulo-resumen">Resumen de tu compra</h3>
  <p className="texto-resumen">
    A continuación, se muestra un resumen detallado de los productos seleccionados, 
    incluyendo precios, cantidades y el costo total de la compra.
  </p>
</div>


      <div className="carrito-contenido">
        {/* Tabla de productos */}
        <div className="tabla-productos-container">
          <table className="tabla-productos">
            <thead>
              <tr className='tr-table-confirmar'>
                <th className='y'>Producto</th>
                <th className='y'>Precio</th>
                <th className='y'>Cantidad</th>
                <th className='y'> Total</th>
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
  <h3 className="titulo-metod">Método de compra</h3>
  <p className="texto-metodo">
    Por favor, selecciona tu método de pago preferido para completar la transacción.
  </p>

  <ul className="lista-metodos">
    <li>Sinpe Móvil - Pago seguro desde tu dispositivo móvil.</li>
    <li>PayPal - Procesa pagos de forma rápida y segura.</li>
  </ul>
    <hr />
  </div>

  <form>
    {/* Opción Sinpe Móvil */}
    <div className="form-check mb-3">
      <ModalMetodoPago/>
   

    
    </div>

    {/* Opción PayPal */}
    <div className="form-check mb-3">
      <FormPaypal Total={TotalDolares}/>
    </div>

    {/* Botón Finalizar */}
    {/* <button
      type="submit"
      className="btn btn-success w-100 mt-3"
      // onClick={(e) => {
      //   e.preventDefault();
      //   confirmarCompra(); // Reemplaza con tu función de finalizar compra
      // }}
    >
      Subir Comprobante
    </button> */}
  </form>
</div>


            <p>
              <strong>Subtotal:</strong> ₡ {Total.toLocaleString()}
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
          <hr />
          <p className="nota-importante">
    <strong>Nota importante:</strong> Asegúrate de verificar los detalles antes de proceder con el pago.
  </p>
          
        
        </div>
      </div>
      <br /><br /><br />  
      <div>
      <Footer/>
      </div>
    </div>
  );
}

export default Confirmar;
