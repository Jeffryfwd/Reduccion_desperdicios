import React, { useState } from 'react'
import { Await, Link, useNavigate  } from 'react-router-dom';
import { Postproducts } from '../../services/GetProducts';
import { useEffect } from 'react';
import GetCategoria from '../../services/GetCategoria';

function AñadirProducto() {
    const[Nombre_producto, setNombre]= useState("")
    const[Fecha_vencimiento, setFecha]= useState("")
    const[Cantidad, setCantidad]=useState("")
    const[Categoria, setCategoria]=useState("")
    const[Precio, setPrecio]=useState("")
    const[Estado, setEstado]= useState("")
    const[ListaCategoria, SetListaCategoria]=useState([])
    const navigate= useNavigate();
    

    useEffect(() => {
        async function ObtenerCategoria() {
          const Categoriass = await GetCategoria(); // Llama a la función de servicios para obtener los productos.
          SetListaCategoria(Categoriass); // Actualiza el estado con los datos obtenidos.
        }
        ObtenerCategoria();
      }, []);
    
    const CargarNombreProduct=(e)=>{
        setNombre(e.target.value)
    }
    const CargarFechaVencimiento=(e)=>{
        setFecha(e.target.value)
    }
    const CargarCantidad=(e)=>{
        setCantidad(e.target.value)
    }
    const CargarCategoria = (e) => {
      setCategoria(e.target.value); // Convertir a entero
      console.log(e.target.value);
  };
  
    const CargarPrecio=(e)=>{
        setPrecio(e.target.value)
    }
    const CargarEstado=(e)=>{
        setEstado(e.target.value)
    }

    const CerrarSesion=()=>{
      localStorage.removeItem('Autenticado', 'Admin')
      navigate('/')
      
    } 

    const Agregar = async (e) => {
      e.preventDefault();
      
      // Crear un objeto con los datos que enviarás para asegurarte de que son correctos
      const datosProducto = {
          Nombre_producto,
          Fecha_vencimiento,
          Cantidad,
          Estado,
          Precio,
          Categoria
      };
  
      console.log(datosProducto, "Estos son los datos enviados"); // Aquí registras los datos correctamente
  
      try {
          await Postproducts(Nombre_producto, Fecha_vencimiento, Cantidad, Estado, Precio, Categoria);
          alert("Producto agregado con éxito");
      } catch (error) {
          console.error("Hubo un error al agregar el producto:", error.message);
      }
  };
  
  return (
    <div>
 <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
          <Link  className="sidebar-link" to='/principal'>Lista de productos</Link>
          <a href="#category" className="sidebar-link">Categoria</a>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV' >Productos a Vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <a href="#reports" className="sidebar-link">Reports</a>
          <a className="sidebar-link"><button onClick={CerrarSesion}>Cerrar Sesion</button></a>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
      </aside>
      <div className="form-container">
      <form className="product-form" onSubmit={Agregar}>
        <h2 className="form-title">Agregar Producto</h2>
        <div className="form-group">
          <label htmlFor="product-name" className="form-label">Nombre del Producto:</label>
          <input 
            type="text" 
            id="product-name" 
            className="form-input" 
            placeholder="Ej: Manzanas" 
            value={Nombre_producto}
            onChange={CargarNombreProduct}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiration-date" className="form-label">Fecha de Vencimiento:</label>
          <input 
            type="date" 
            id="expiration-date" 
            className="form-input" 
            value={Fecha_vencimiento}
            onChange={CargarFechaVencimiento}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity" className="form-label">Cantidad:</label>
          <input 
            type="number" 
            id="quantity" 
            className="form-input" 
            placeholder="Ej: 10" 
            value={Cantidad}
            onChange={CargarCantidad}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Categoría:</label>
          <select id="category" className="form-input" value={Categoria.id} onChange={CargarCategoria}>
                <option value="">Selecciona una categoría</option>
         { ListaCategoria.map((Cate) => (
                <option key={Cate.id} value={Cate.id}>{Cate.Categoria}</option>
         ))}
          </select>

       
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Precio:</label>
          <input 
            type="number" 
            id="price" 
            className="form-input" 
            placeholder="Ej: 5.99" 
            value={Precio}
            onChange={CargarPrecio}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Estado:</label>
          <input 
            type="text" 
            id="price" 
            className="form-input" 
            placeholder="Ej: 5.99" 
            value={Estado}
            onChange={CargarEstado}
          />
        </div>
        <button type="submit" className="form-submit">Guardar Producto</button>
      </form>
    </div>
    </div>
  
    </div>
  )
}

export default AñadirProducto