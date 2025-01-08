import React, { useEffect, useState } from 'react'
import '../../css/VisualizacionPromociones.css'
import Modal from "../Modal/Modal";
import { json, Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'
import { Alert } from 'react-bootstrap'

import LoginButton from '../LoginButton';
import {jwtDecode}  from 'jwt-decode';
import Enlatados from '../../img/Enlatados.png'
import Carnes from '../../img/Carnes.png'
import Lacteos from '../../img/Lacteos.png'
import Imagen1 from '../../img/Imagen1.jpg'
import { GetProducts } from '../../services/GetProducts'
import BotonPerfil from '../BotonPerfil/BotonPerfil';
import Footer from '../Footer/Footer';




function PromocionesVisuali() {
  // Definición de estados
  const [LitaPromociones, setListaPromociones] = useState([]); // Almacena las promociones disponibles.
  const [abrirModal, setAbrirModal] = useState(false); // Controla la apertura y cierre de un modal.
  const [carrito, setCarrito] = useState([]); // Almacena los productos añadidos al carrito.
  const navigate = useNavigate(); // Hook para la navegación entre rutas.
  const [isLogin, setIsLogin] = useState(false); // Verifica si el usuario ha iniciado sesión.
  const [ListaProductos, setProducto] = useState([]); // Almacena la lista de productos disponibles.
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' }); // Almacena información para mostrar alertas.

  // Hook useEffect que se ejecuta al montar el componente.
  useEffect(() => {
    // Función para obtener las promociones desde el backend.
    async function ObtenerPromociones() {
      const Promociones = await GetPromociones(); // Llama a la función GetPromociones.
      setListaPromociones(Promociones); // Actualiza el estado con las promociones obtenidas.
    }

    // Función para obtener los productos desde el backend.
    const ObtenerProductos = async () => {
      const Productos = await GetProducts(); // Llama a la función GetProducts.
      setProducto(Productos); // Actualiza el estado con los productos obtenidos.
    };

    // Recupera el token almacenado en el localStorage.
    const TokenCodigo = localStorage.getItem('access-token');

    // Verifica si el token no está presente.
    if (!TokenCodigo) {
      console.log('No se encontró token en la sesión');
    }

    try {
      // Si hay un token, se establece que el usuario ha iniciado sesión.
      if (TokenCodigo) {
        setIsLogin(true);
      }

      // Decodifica el token para obtener información del usuario.
      const tokenDecifrado = jwtDecode(TokenCodigo);
      localStorage.setItem('Id_user', tokenDecifrado.user_id); // Almacena el ID del usuario en el localStorage.
      console.log(tokenDecifrado);
    } catch (error) {
      console.log('ERROR al decodificar el token', error); // Muestra un error si no se pudo decodificar el token.
    }

    // Función para limpiar el localStorage después de cierto tiempo.
    const EliminarLocal = () => {
      setTimeout(() => {
        localStorage.clear(); // Limpia el almacenamiento local después de 200 segundos.
      }, 200000);
    };

    // Recupera el carrito almacenado en el localStorage.
    const carritoGuardado = JSON.parse(localStorage.getItem("CarritoSelecccionado"));
    if (carritoGuardado) {
      setCarrito(carritoGuardado); // Si hay un carrito guardado, se carga en el estado.
    }

    // Llamadas a las funciones para obtener datos y limpiar el localStorage.
    ObtenerPromociones();
    EliminarLocal();
    ObtenerProductos();
  }, []); // El array vacío asegura que se ejecute solo al montar el componente.

  // Función para agregar un producto al carrito.
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => { // Actualiza el estado del carrito.
      // Busca si el producto ya existe en el carrito.
      const existe = prevCarrito.find((item) => item.id === producto.id && item.tipo === producto.tipo);
      if (existe) {
        setAlert({ show: true, message: 'Producto Agregado al carrito de compras' });

        // Si el producto ya existe, incrementa su cantidad.
        return prevCarrito.map((item) =>
          item.id === producto.id && item.tipo === producto.tipo
            ? { ...item, cantidad: item.cantidad + 1 } // Copia el objeto y aumenta la cantidad.
            : item
        );
      } else {
        setAlert({ show: true, message: 'Producto Agregado al carrito de compras' });
        // Si no existe, lo agrega al carrito con cantidad inicial de 1.
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  console.log(carrito); // Muestra el contenido del carrito en consola.

  // Función para eliminar un producto del carrito por su ID.
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id)); // Filtra y elimina el producto con el ID especificado.
    setAlert({ show: true, message: 'Producto Eliminado del carrito de compras', variant: 'warning' });
  };

  // Función para actualizar la cantidad de un producto en el carrito.
  const actualizarCantidad = (id, tipo, nuevaCantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id && item.tipo === tipo
          ? { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 0 } // Actualiza la cantidad si es mayor a 0.
          : item
      )
    );
  };

  // Calcula el subtotal del carrito.
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.cantidad * item.Precio_total || acc + item.cantidad * item.Precio,
    0
  );

  // Función para manejar el proceso de compra.
  const ManejarCarrito = () => {
    const id_cliente = localStorage.getItem('Id_user'); // Recupera el ID del usuario.
    if (!id_cliente) {
      setAlert({ show: true, message: 'Debes Iniciar sesión para continuar la compra', variant: 'warning' });
      return; // Si no hay ID, muestra una alerta y detiene el proceso.
    }
    localStorage.setItem('CarritoSelecccionado', JSON.stringify(carrito, subtotal)); // Guarda el carrito en el localStorage.
    navigate('/confirmar/compra'); // Redirige a la página de confirmación de compra.
  };

  // Función para cerrar sesión.
  function CerrarSesion() {
    localStorage.clear(); // Limpia el almacenamiento local.
    window.location.reload(); // Recarga la página.
    navigate('/'); // Redirige a la página principal.
  }




  return (
    <div>
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

    
    {isLogin ? <button className="category-button" onClick={CerrarSesion}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg></button> :<LoginButton/>}
<li className="carrito-item">
            <button
              className="category-button"
              onClick={() => setAbrirModal(true)} // Abre el modal al hacer clic.
              
            >
              ({carrito.length})
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
              </svg>
            </button>
          </li>

      {/* Modal que se abre al hacer clic */}
      <Modal
        isOpen={abrirModal}
        onClose={() => setAbrirModal(false)} // Cierra el modal.
      >
        <h2 className="cart-title">Mi carrito</h2>
        <button className="empty-cart-button" onClick={() => setCarrito([])}>Vaciar carrito</button>
        <div className="cart-items">
          {carrito.length ===0 ?(
              <p className="empty-cart-message">¡Tu carrito está vacío!</p>
          ):(
            carrito.map((item)=>(
              <div key={`${item.id}-${item.tipo}`} className="carrito-item">
                  <img
                    src={item.url_imagen || item.Imagen_Producto}
                    className="promotion-image"

                  />
                   <p className="cart-item-name">{item.tipo === 'promocion' ? 'Promocion': 'Producto'}
                    {item.Nombre_producto || item.id_producto.Nombre_producto}
                   </p>
                   <p className="cart-item-price">₡ {item.Precio_total || item.Precio}</p>
                   <div className="cart-quantity-control">
                  <button
                     className="quantity-button decrease"
                    onClick={() =>
                      actualizarCantidad(item.id,item.tipo ,item.cantidad - 1)
                    }
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.cantidad}</span>
                  <button
                   className="quantity-button increase"
                    onClick={() =>
                      actualizarCantidad(item.id, item.tipo, item.cantidad + 1)
                    }
                  >
                    + 
                    
                  </button>
                </div>
                {console.log(item)}
                <button   className="remove-item-button" onClick={() => eliminarDelCarrito(item.id)}>🗑️</button>
              </div>
            ))
          )}
      </div>
      <div className="cart-summary">

          <p  className="cart-subtotal">
             <span>Subtotal:</span> ₡ {subtotal.toFixed(2)}
             </p>
          <p  className="cart-total" >
          <span>Total:</span> ₡ {subtotal.toFixed(2)}
          </p>
          <button onClick={ManejarCarrito} className="checkout-button" >Continuar con la compra</button>
        </div>
        
      </Modal>
  
    

  </ul>
</div>

 <div className=' Alerta'>
      {alert.show && (
          <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
            {alert.message}
          </Alert>
        )}  
      </div>
  <img src={Imagen1} alt="" className='Imagen-bienvenida' />

      <div className="bienvenida-container">
  <h1 className="bienvenida-titulo">¡Bienvenidos a Nuestra Tienda!</h1>


</div>
<br /><br /><br />
<div className='Texto-bienvenida'>
  <p className="bienvenida-texto">
    Descubre ofertas increíbles y productos seleccionados cuidadosamente para ti. 
    <span className="bienvenida-resalta">¡Calidad y frescura garantizada!</span>
  </p>
  <p className="bienvenida-texto">
    Aprovecha nuestras promociones exclusivas y llena tu carrito con productos irresistibles.
  </p>
  <p className="bienvenida-texto">
    ¡No esperes más, explora nuestro catálogo hoy mismo!
  </p>
  </div>

      {/* Sección de categorías destacadas */}
      <div className="highlighted-categories">
        <h2>Categorías destacadas</h2>
        <br /><br />
        <div className="categories-container">
          
            <div className="category-card">
              <div className="category-icon">
                <img src='https://info.megasuper.com/categorias/Abarrotes.png' alt="" />
              </div>
              <Link to='/abarrotes'><p className="category-name">Abarrotes</p></Link> 
              </div>
              

              <div className="category-card">
              <div className="category-icon">
              <img src={Enlatados} alt="" />
              </div>
              <Link to='/enlatados'><p className="category-name">Enlatados</p></Link> 
              </div>

              <div className="category-card">
              <div className="category-icon">
                <img src={Carnes} alt="" />
              </div>
              <Link to='/carnes'><p className="category-name">Carnes</p></Link> 
              </div>
              <div className="category-card">
              <div className="category-icon">
                <img src={Lacteos} alt="" />
              </div>
              <Link to='/lacteos'><p className="category-name">Lacteos</p></Link> 
              </div>
         
        </div>
      </div>
      

{/*CARRTAS DE LAS PROMOCIONES  */}
<div className="promotions-container">
  <div className="promotions-container">
    <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" >
      <h1 className="promotions-title">Promociones</h1>
      <div className="promotions-sections1">
        {LitaPromociones.map((Promo) => (
          <div className="promotion-item1" key={Promo.id}>
            <div className="promocion-card21">
              <div className="promocion-card-header1">
                {Promo.url_imagen && (
                  <img
                    src={Promo.url_imagen}
                    alt={Promo.id_producto.Nombre_producto}
                    className="promotion-image"
                  />
                )}
              </div>
              <div className="promocion-card-body">
                <p className="promotion-name">{Promo.id_producto.Nombre_producto}</p>
                <p className="promotion-discount">
                  Ahorro: <span className="discount-percentage">{Promo.Descuento}%</span>
                </p>  
                <span className="old-price">CRC {Promo.id_producto.Precio}</span>

                <p className="promotion-price">
                  <span className="current-price">CRC {Promo.Precio_total}</span>
                </p>
                <button className="add-to-cart-promocion"  onClick={() => agregarAlCarrito({...Promo, tipo: 'promocion'})}
                >Agregar 🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
</div>

<div className="promotions-container">
<div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" id='Contenedor-productos-disponibles' >
      <h1 className="promotions-title">Productos Disponibles</h1>
      <div className="promotions-sections1">
        {ListaProductos.map((prod)=>(
          <div className='productos-item' key={prod.id}>
            <div className="producto-card2">
              <div className="producto-card2-header">
                {prod.Imagen_Producto && (
                  <img 
                  src={prod.Imagen_Producto} 
                  alt={prod.Nombre_producto}
                  className='promotion-image'
                  />
                  )}
                  </div>
                  <div className='promotion-card-body'>
                  <p className="producto-card2-name">{prod.Nombre_producto}</p>
                  <p className="promotion-price">
                  <span className="current-price">CRC {prod.Precio}</span>
                </p>
                <button className="add-to-cart-product"  onClick={() => agregarAlCarrito({...prod, tipo: 'producto'})}
                >Agregar 🛒</button>
                  </div>

            </div>
         </div>

        ))}

      </div>
      </div>
      </div>

     
        <Footer/>
     
    </div>
  )
}

export default PromocionesVisuali