import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'
import DeletePromociones from '../../services/Promociones/DeletePromociones';
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
async function EliminarPromociones(id) {
  await DeletePromociones(id);
  alert("Producto eliminado con exito")
  const ListaActualizada= await GetPromociones();
  setListaPromociones(ListaActualizada)
}


    
  return (
    <div>
       <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
        <Link  className="sidebar-link" to='/principal'>Lista de productos</Link>
          <Link to='/addcategoria' className="sidebar-link">Categoria</Link>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV'>Productos a vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <Link  to='/visualizacion/venta' className="sidebar-link">Pedidos</Link>
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
     
      
        <div className="contenedorCartasPromo">
  {LitaPromociones.map((Promo) => (
    <div className="promocion-card" key={Promo.id}>
      <div className="promocion-card-header">
        {Promo.url_imagen && <img src={Promo.url_imagen} alt="" />}
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
          <p>Inicio de Promoción: <span className="fecha-inicio">{Promo.Fecha_inicio}</span></p>
          <p>Fin de Promoción: <span className="fecha-fin">{Promo.Fecha_fin}</span></p>
        </div>
        <button className="btn-delete" onClick={() => EliminarPromociones(Promo.id)}>Eliminar</button>
      </div>
    </div>
  ))}
</div>

  
     </main>
    </div>
  )
}

export default Promociones