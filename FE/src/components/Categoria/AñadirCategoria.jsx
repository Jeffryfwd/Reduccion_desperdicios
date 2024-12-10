import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PostCategoria from '../../services/SCategoria/PostCategoria'

function AñadirCategoria() {
    const [Categoria, sertCategoria]= useState("")

    const CargarCategoria=(e)=>{
        sertCategoria(e.target.value)
    }

 const AddCategoria= async(e)=>{
  e.preventDefault();
    try {
        await PostCategoria(Categoria)
        alert('Categoria Agregada con exito')
    } catch (error) {
        console.log('Hubo un error en añadir la categoria', error);
        
        
    }
   
    
 }
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
          <Link to='/addcategoria' className="sidebar-link">Categoria</Link>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV' >Productos a Vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <Link  to='/visualizacion/venta' className="sidebar-link">Pedidos</Link>
          <a href="#reports" className="sidebar-link">Reports</a>
          <a className="sidebar-link"><button onClick={CerrarSesion}>Cerrar Sesion</button></a>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
      </aside>
      <div className="form-container-añadir-Cat">
      <form className="Category-form" onSubmit={AddCategoria}>
      <h2 className="form-title">Agregar Producto</h2>
         <div className="form-group">
        <label htmlFor="" className="form-label">Nombre de la categoria</label>
        <input type="text" 
       
        value={Categoria}
        onChange={CargarCategoria}
        />
         </div>

        <button type='submit' className="form-submit">Añadir Categoria</button>
      </form>
      </div>
    </div>
  )
}

export default AñadirCategoria