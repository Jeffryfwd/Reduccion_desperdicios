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
  const [CarritoSeleccionado, setCarritoSeleccionado] = useState([]);
  const [Cliente_id, setCliente] = useState("");
  const [Comprobante, setComprobante]= useState("")
  const [NombreUsuario, setUserName]= useState("")
  const navigate = useNavigate();
 const [mostrarInput, setMostrarInput]=useState(false);   
 const [alert, setAlert]= useState({show: false, message: '', variant: ''})
 


  useEffect(() => {
    const DatosCarrito = localStorage.getItem('CarritoSelecccionado');
    const comprobante = localStorage.getItem('Comprobante')
    const Id= localStorage.getItem('Id_user')
    const UserName= localStorage.getItem("UserName")
    if (DatosCarrito) {
      setCarritoSeleccionado(JSON.parse(DatosCarrito));
    }
    if (Id) {
      setCliente(Id)
    }
    if (comprobante) {
      setComprobante(comprobante)
      console.log(comprobante);
      
    }
    if (UserName) {
      setUserName(UserName)
    }
  }, []);
 
  
  


  const confirmarCompra = async () => {
   

    const datosCompra = {
      Cliente_id,
      carrito: CarritoSeleccionado, 
      Comprobante,
    };

    console.log(datosCompra);
    
    if (!Comprobante) {
      return setAlert({show: true, message: '¡Debes realizar el pago para Efectuar tu compra!'})
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/rventa/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCompra),
      });

      if (response.ok) {
        setAlert({show: true, message: '¡Compra realizada exitosamente!'})
        generarFactura()
        localStorage.removeItem('CarritoSeleccionado');
        setTimeout(() => {
          navigate('/'); // Redirige a la página principal
        }, 3000);
       
      } else {
        setAlert({show: true, message: '¡Hubo un error al realizar la compra!'})
        
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



  //Generar factura
  const generarFactura = () => {
    const doc = new jsPDF();
  
    // Encabezado de la factura
    doc.setFontSize(18);
    doc.text('Factura de Compra', 20, 20);
  
    // Información del cliente y la compra
    doc.setFontSize(12);
    doc.text(`Nombre Cliente: ${NombreUsuario}`, 20, 40);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 50);
  
    // Crear la tabla de productos
    const columnas = ['Producto', 'Precio', 'Cantidad', 'Total'];
    const filas = CarritoSeleccionado.map((item) => [
      item.id_producto?.Nombre_producto || item.Nombre_producto || 'Sin nombre',
      `₡ ${(item.Precio_total || item.Precio || 0).toLocaleString()}`,
      item.cantidad || 0,
      `₡ ${((item.Precio_total || item.Precio || 0) * (item.cantidad || 0)).toLocaleString()}`,
    ]);
  
    doc.autoTable({
      startY: 60,
      head: [columnas],
      body: filas,
    });
  
    // Total final      
    doc.setFontSize(14);
    doc.text(`Total: ₡ ${CalcularTotal().toLocaleString()}`, 20, doc.lastAutoTable.finalY + 10);
  
    // Descargar el PDF
    doc.save(`Factura_${new Date().getTime()}.pdf`);
  };
  
  const Total= CalcularTotal()
  console.log('El total es', Total);
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
