import React, { useEffect, useState } from 'react'
import '../../css/VisualizacionPromociones.css'
import { Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'

function PromocionesVisuali() {
const [LitaPromociones, setListaPromociones]= useState([])

const navigate= useNavigate();

useEffect(()=>{
  async function ObtenerPromociones() {
    const Promociones= await GetPromociones()
    setListaPromociones(Promociones)

  }
  ObtenerPromociones()
},[])
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
      <button className="category-button">Plaza</button>
    </li>
    <li className="category-item">
      <button className="category-button">Nuevo</button>
    </li>
    <li className="category-item">
      <button className="category-button">AliExpress Business</button>
    </li>
    <li className="category-item">
      <button className="category-button">Hogar y jardín</button>
    </li>
    <li className="category-item">
      <button className="category-button">Cabello y pelucas</button>
    </li>
    <li className="category-item">
      <button className="category-button">Más</button>
    </li>
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
                <button className="add-to-cart">Agregar 🛒</button>
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