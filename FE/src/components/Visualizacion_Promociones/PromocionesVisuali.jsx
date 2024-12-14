import React, { useEffect, useState } from 'react'
import '../../css/VisualizacionPromociones.css'
import Modal from "../Modal/Modal";
import { json, Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'
import GetCategoria from '../../services/GetCategoria';
import LoginButton from '../LoginButton';
import {jwtDecode}  from 'jwt-decode';
import Enlatados from '../../img/Enlatados.png'
import Carnes from '../../img/Carnes.png'
import Lacteos from '../../img/Lacteos.png'
import { GetProducts } from '../../services/GetProducts'



function PromocionesVisuali() {
const [LitaPromociones, setListaPromociones]= useState([])
const [abrirModal, setAbrirModal] = useState(false);
const [carrito, setCarrito] = useState([]); // Estado del carrito
const navigate= useNavigate();
const [isLogin, setIsLogin] = useState(false);
const [ListaProductos, setProducto]=useState([])

useEffect(()=>{
  async function ObtenerPromociones() {
    const Promociones= await GetPromociones()
    setListaPromociones(Promociones)

  }
  const ObtenerProductos=async()=>{
    const Productos= await GetProducts()
    setProducto(Productos)
    }
  const TokenCodigo= localStorage.getItem('access-token')
  if (!TokenCodigo) {
    console.log('No se encontro token en la sesion');
    
    
  }
  try {
    if (TokenCodigo) {
      setIsLogin(true);
    }
    const tokenDecifrado= jwtDecode(TokenCodigo)
    localStorage.setItem('Id_user',tokenDecifrado.user_id)
    

    
  } catch (error) {
    console.log('ERROR al decodificar el token', error);
    
  }
  const EliminarLocal=()=>{
    setTimeout(() => {
      localStorage.clear()
     
      

    }, 200000);
   
  }


const carritoGuardado= JSON.parse(localStorage.getItem("CarritoSelecccionado"))
if (carritoGuardado) {
  setCarrito(carritoGuardado)
}
  ObtenerPromociones()
  EliminarLocal()
  ObtenerProductos()


},[])





  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => { //producto es un objeto que trae la informacion de producto que queremos agregar
    setCarrito((prevCarrito) => { //Seteo el estado de setCarrito y prevCarrito es el producto actual antes de agregar otro producto
      const existe = prevCarrito.find((item) => item.id === producto.id && item.tipo === producto.tipo); //Buscamos si el productos que queremos agregar esta en el carrito
      if (existe) {
        // Y si el producto ya está en el carrito, incrementa la cantidad
        return prevCarrito.map((item) => //uso el map para recorrer el producto del carrito y verifica si el id es igual al producto que esta en el carrito y si es igual se incremnta
          item.id === producto.id && item.tipo === producto.tipo
            ? { ...item, cantidad: item.cantidad + 1 }//'...' es para crear una copia del objeto producto y le añado una propiedad cantidad que va aunmentar en uno
            : item
        );
      } 
      
      else {
        // Si no está, agrégalo al carrito con cantidad inicial 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];//  ([...]) para crear un nuevo arreglo que incluye todos los datos de los productos anteriores
      }
    });
  };
console.log(carrito);

   // Función para eliminar un producto del carrito
   const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
      )
    );
  };


    // Calcular el subtotal y total
    const subtotal = carrito.reduce(
      (acc, item) => acc + item.cantidad * item.Precio_total || acc + item.cantidad * item.Precio,
      0
    );


const ManejarCarrito=()=>{
  
  const id_cliente= localStorage.getItem('Id_user')
 
  if (!id_cliente) {
    return alert('Debe iniciar sesion para confirmar su compra')
  }
  localStorage.setItem('CarritoSelecccionado', JSON.stringify(carrito, subtotal))
  navigate('/confirmar/compra')

}



function CerrarSesion() {
  localStorage.clear()
  navigate('/')
}



  return (
    <div>

 
    


<div className="navbar-categories">
  <ul className="categories-list">
    <li className="category-item">
      <button className="category-button">Todas las categorías</button>
    </li>
    <li className="category-item">
      <button className="category-button active">SuperOfertas</button>
    </li>
  
    <li className="category-item">
      <button className="category-button">Nuevo</button>
    </li>
    <div className="navbar-categories">
        <ul className="categories-list">
          <li className="category-item">
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
        </ul>
      </div>


{isLogin ? <button onClick={CerrarSesion}>Cerrar Sesion</button> :<LoginButton/>}



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
                      actualizarCantidad(item.id, item.cantidad - 1)
                    }
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.cantidad}</span>
                  <button
                   className="quantity-button increase"
                    onClick={() =>
                      actualizarCantidad(item.id, item.cantidad + 1)
                    }
                  >
                    
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

      {/* Sección de categorías destacadas */}
      <div className="highlighted-categories">
        <h2>Categorías destacadas</h2>
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
      <h1 className="promotions-title">Ofertas de hoy</h1>
      <div className="promotions-sections">
        {LitaPromociones.map((Promo) => (
          <div className="promotion-item" key={Promo.id}>
            <div className="promocion-card2">
              <div className="promocion-card-header">
                {Promo.url_imagen && (
                  <img
                    src={Promo.url_imagen}
                    alt={Promo.id_producto.Nombre_producto}
                    className="promotion-image"
                  />
                )}
              </div>
              <div className="promotion-card-body">
                <p className="promotion-name">{Promo.id_producto.Nombre_producto}</p>
                <p className="promotion-discount">
                  Ahorro: <span className="discount-percentage">{Promo.Descuento}%</span>
                </p>
                <p className="promotion-price">
                  <span className="current-price">CRC {Promo.Precio_total}</span>
                  <span className="old-price">CRC {Promo.id_producto.Precio}</span>
                </p>
                <button className="add-to-cart"  onClick={() => agregarAlCarrito({...Promo, tipo: 'promocion'})}
                >Agregar 🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  

</div>
<div className="promotions-container">
      <h1 className="promotions-title">Productos de la categoria abarrotes</h1>
      <div className="promotions-sections">
        {ListaProductos.map((prod)=>(
          <div className='promotion-item' key={prod.id}>
            <div className="promocion-card2">
              <div className="promocion-card-header">
                {prod.Imagen_Producto && (
                  <img 
                  src={prod.Imagen_Producto} 
                  alt={prod.Nombre_producto}
                  className='promotion-image'
                  />
                  )}
                  </div>
                  <div className='promotion-card-body'>
                  <p className="promotion-name">{prod.Nombre_producto}</p>
                  <p className="promotion-price">
                  <span className="current-price">CRC {prod.Precio}</span>
                </p>
                <button className="add-to-cart"  onClick={() => agregarAlCarrito({...prod, tipo: 'producto'})}
                >Agregar 🛒</button>
                  </div>

            </div>
         </div>

        ))}

      </div>
      </div>

        
    </div>
  )
}

export default PromocionesVisuali