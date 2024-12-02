import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'
import Autenticacion from '../Autenticacion';

function Promociones() {
  Autenticacion()
const [LitaPromociones, setListaPromociones]= useState([])
const navigate= useNavigate();

useEffect(()=>{
  async function ObtenerPromociones() {
    const Promociones= await GetPromociones()
    setListaPromociones(Promociones)

  }
  ObtenerPromociones()
},[])

const CerrarSesion=()=>{
  localStorage.clear()
  navigate('/')
  
}
    
  return (
    <div>
       <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
        <Link  className="sidebar-link" to='/principal'>Lista de productos</Link>
          <a  href="#category" className="sidebar-link">Categoria</a>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV'>Productos a vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <a href="#reports" className="sidebar-link">Reports</a>
          <p className="sidebar-link" ><button onClick={CerrarSesion}>Cerrar Sesion</button></p>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
        
      </aside>
      <main className="main-content">
      <header className="header">
        <div className='header-title2'>
          <h1 className="header-title">ViewProduct</h1>
          </div>
          <div className="header-actions1">
            <input type="text" className="search-input" placeholder="Search Product" />
            <button className="search-button">Search</button>
          </div>
        </header>
     
      
      <div className='contenedorCartasPromo'>
        
        
    {LitaPromociones.map((Promo)=>(
            <div className="promocion-card" key={Promo.id}>
            <div className="promocion-card-header">
              <img 
                src="ruta-a-la-imagen.jpg" 
                alt="Imagen del Producto" 
                className="promocion-card-imagen"
              />
            </div>
            <div className="promocion-card-body">
              <h3 className="promocion-card-nombre">{Promo.id_producto.Nombre_producto}</h3>
              <p className="promocion-card-precio-antes">
                Precio Antes: <span className="precio-original">{Promo.id_producto.Precio}</span>
              </p>
              <p className="promocion-card-descuento">
                Descuento: <span className="descuento-porcentaje">{Promo.Descuento}%</span>
              </p>
              <p className="promocion-card-precio-total">
                Precio Total: <span className="precio-con-descuento">{Promo.Precio_total}</span>
              </p>
              <div className="promocion-card-fechas">
                <p>Inicio de Promocion: <span className="fecha-inicio">{Promo.Fecha_inicio}</span></p>
                <p>Fin de promocion: <span className="fecha-fin">{Promo.Fecha_fin}</span></p>
              </div>
            </div>
            
          </div>
    ))}
    </div>
  
     </main>
    </div>
  )
}

export default Promociones