import React, { useEffect, useState } from 'react'
import '../../css/VisualizacionPromociones.css'
import Modal from "../Modal/Modal";
import { json, Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'
import LoginButton from '../LoginButton';
import {jwtDecode}  from 'jwt-decode';




function PromocionesVisuali() {
const [LitaPromociones, setListaPromociones]= useState([])
const [abrirModal, setAbrirModal] = useState(false);
const [carrito, setCarrito] = useState([]); // Estado del carrito
const navigate= useNavigate();
const [isLogin, setIsLogin] = useState(true);

useEffect(()=>{
  async function ObtenerPromociones() {
    const Promociones= await GetPromociones()
    setListaPromociones(Promociones)

  }
  const TokenCodigo= localStorage.getItem('access-token')
  if (!TokenCodigo) {
    console.log('No se encontro token en la sesion');
    return
    
  }
  try {
    const tokenDecifrado= jwtDecode(TokenCodigo)
    localStorage.setItem('Id_user',tokenDecifrado.user_id)
    
  if (!TokenCodigo) {
  console.log('No se encontró token en la sesión');
  return;
}
    
  } catch (error) {
    console.log('ERROR al decodificar el token', error);
    
  }
  const EliminarLocal=()=>{
    setTimeout(() => {
      localStorage.clear()
     
      

    }, 60000);
   
  }

const carritoGuardado= JSON.parse(localStorage.getItem("CarritoSelecccionado"))
if (carritoGuardado) {
  setCarrito(carritoGuardado)
}
  ObtenerPromociones()
  EliminarLocal()


},[])





  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => { //producto es un objeto que trae la informacion de producto que queremos agregar
    setCarrito((prevCarrito) => { //Seteo el estado de setCarrito y prevCarrito es el producto actual antes de agregar otro producto
      const existe = prevCarrito.find((item) => item.id === producto.id); //Buscamos si el productos que queremos agregar esta en el carrito
      if (existe) {
        // Y si el producto ya está en el carrito, incrementa la cantidad
        return prevCarrito.map((item) => //uso el map para recorrer el producto del carrito y verifica si el id es igual al producto que esta en el carrito y si es igual se incremnta
          item.id === producto.id
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
      (acc, item) => acc + item.cantidad * item.Precio_total,
      0
    );


const ManejarCarrito=()=>{
  
  const id_cliente= localStorage.getItem('Id_user')
 
  if (!id_cliente) {
    return alert('Debe iniciar sesion para confirmar su compra')
  }
  localStorage.setItem('CarritoSelecccionado', JSON.stringify(carrito))
  navigate('/confirmar/compra')

}





const categoriasDestacadas = [
  { nombre: "Abarrotes", imagen: "ruta/a/abarrotes.png" },
  { nombre: "Carnes y Pescados", imagen: "ruta/a/carnes-pescados.png" },
  { nombre: "Frutas y Verduras", imagen: "ruta/a/frutas-verduras.png" },
  { nombre: "Lácteos y Huevos", imagen: "ruta/a/lacteos-huevos.png" },
  { nombre: "Jugos y Bebidas", imagen: "ruta/a/jugos-bebidas.png" },
  { nombre: "Licores y Cerveza", imagen: "ruta/a/licores-cerveza.png" },
  { nombre: "Cuidado Personal", imagen: "ruta/a/cuidado-personal.png" },
  { nombre: "Limpieza del hogar", imagen: "ruta/a/limpieza-hogar.png" },
  { nombre: "Mascotas", imagen: "ruta/a/mascotas.png" },
  { nombre: "Panadería", imagen: "ruta/a/panaderia.png" },
];
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


{isLogin && <LoginButton/>}



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
              <div key={item.id} className="carrito-item">
                     {item.url_imagen && (
                  <img
                    src={item.url_imagen}
                   
                    className="promotion-image"
                  />
                )}
                   <p className="cart-item-name">{item.id_producto.Nombre_producto}</p>
                   <p className="cart-item-price">₡ {item.Precio_total}</p>
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
                    +
                  </button>
                </div>
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
          {categoriasDestacadas.map((categoria, index) => (
            <div className="category-card" key={index}>
              <div className="category-icon">
                <img src={categoria.imagen} alt={categoria.nombre} />
              </div>
              <p className="category-name">{categoria.nombre}</p>
            </div>
          ))}
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
                <button className="add-to-cart"  onClick={() => agregarAlCarrito(Promo)}
                >Agregar 🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  

</div>

        
    </div>
  )
}

export default PromocionesVisuali