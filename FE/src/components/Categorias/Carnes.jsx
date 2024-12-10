import React, { useEffect, useState } from 'react'
import { GetProducts } from '../../services/GetProducts'


function Carnes() {
  const [ListaProductos, setProducto]=useState([])

useEffect(()=>{
  const ObtenerProductos=async()=>{
    const Productos= await GetProducts()
    setProducto(Productos.filter((pro)=> pro.Categoria.Categoria==='Carnes'))
    }
    ObtenerProductos()
},[])
  return (
    <div>
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
              <button className="add-to-cart"  onClick={() => agregarAlCarrito(Promo)}
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

export default Carnes