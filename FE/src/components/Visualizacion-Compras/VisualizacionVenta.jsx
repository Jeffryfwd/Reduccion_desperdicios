import React, { useEffect, useState } from 'react'
import GetVenta from '../../services/Venta/GetVenta'
import { Link } from 'react-router-dom'

function VisualizacionVenta() {
  const [ListaVentas, setListaVenta]=useState([])



  useEffect(()=>{
    async function ObtenerVentas() {
      const Venta= await GetVenta()
      setListaVenta(Venta)
      
    }
    ObtenerVentas();
  },[])

  const CerrarSesion=()=>{
    localStorage.clear()
    navigate('/')
    
  }

  

 
  return (
    <div className="dashboard">
     <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
          <Link  className="sidebar-link" to='/principal'>Lista de productos</Link>
          <Link to='/addcategoria' className="sidebar-link">Categoria</Link>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV' >Productos a Vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <Link  to='/visualizacion/venta' className="sidebar-link">Pedidos</Link>

          <a href="#reports" className="sidebar-link">Reports</a>
          <p className="sidebar-link" ><button onClick={CerrarSesion}>Cerrar Sesion</button></p>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
          
        </nav>
      </aside>

    <main className="main-content">
      <section className="product-gridlist">
       <table className="product-table">
       <thead>
        <tr>
          
          <th>Nombre Cliente</th>
          <th>Nombre Producto</th>
          <th>Cantidad</th>
          <th>Precio sin descuento</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>

          {ListaVentas.map((Vent)=>(
            <tr key={Vent.id}>
            <td>{Vent.Cliente.first_name || 'Sin nombre'}</td>
            <td>{Vent.id_producto.Nombre_producto|| 'Sin nombre'}</td>
            <td>{Vent.Cantidad_venta|| 'Sin nombre'}</td>
            <td>{Vent.id_producto.Precio|| 'Sin nombre'}</td>
            <td>{Vent.Total|| 'Sin nombre'}</td>
            
              
            </tr>

          ))}
        </tbody>

       </table>
       </section>

       </main>
      

    </div>
  )
}

export default VisualizacionVenta