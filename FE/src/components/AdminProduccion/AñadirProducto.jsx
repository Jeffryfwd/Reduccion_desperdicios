import React, { useState } from 'react'
import { Await, Link, useNavigate  } from 'react-router-dom';
import { Postproducts } from '../../services/GetProducts';
import { useEffect } from 'react';
import GetCategoria from '../../services/GetCategoria';
import Autenticacion from '../Autenticacion';
import { UploadFile } from '../../Firebase/config';
import { Alert } from 'react-bootstrap'

function AñadirProducto() {
  Autenticacion()
    const[Nombre_producto, setNombre]= useState("")
    const[Fecha_vencimiento, setFecha]= useState("")
    const[Cantidad, setCantidad]=useState("")
    const[Categoria, setCategoria]=useState("")
    const[Precio, setPrecio]=useState("")
    const[Estado, setEstado]= useState("")
    const[ListaCategoria, SetListaCategoria]=useState([])
    const [Imagen_Producto, setFile]= useState("")
    const [alert, setAlert]= useState({show: false, message: '', variant: ''})
    const navigate= useNavigate();
    

    useEffect(() => {
        async function ObtenerCategoria() {
          const Categoriass = await GetCategoria(); // Llama a la función de servicios para obtener los productos.
          SetListaCategoria(Categoriass); // Actualiza el estado con los datos obtenidos.
        }
        ObtenerCategoria();
      }, []);
    
      //Manejamos eventos, para entradas de input cuando el usuario escriba en se actulice el estado
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

    //Creamos la funcion cerrar sesion, que efectua un remove item, de los atributos en el local
    const CerrarSesion=()=>{
      localStorage.removeItem('Autenticado', 'Admin')
      navigate('/login')
      
    } 
 
    //Funcion para cargar imaganes
    //Manejo de evento para cargar un archivo seleccionado
    const CargarImagen=async(e)=>{
      const file= e.target.files[0] //obtengo el primer archivo seleccionado
      setFile(file) //seteo en el estado de setFile
      if (file) {
        const resultado= await UploadFile(file); // Llamamos la funcion que maneja la carga del archivo
        setFile(resultado) //Actualizo de nuevo el estado de setFile que me devuelve la respuesta del funcion anterior
      }
    }

    const Agregar = async (e) => {
      e.preventDefault(); //evita que la pagina se recargue sola
      
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
          await Postproducts(Nombre_producto, Fecha_vencimiento, Cantidad, Estado, Precio, Categoria, Imagen_Producto);
        // Limpiar los inputs estableciendo los estados a valores vacíos
        setNombre('');
        setFecha('');
        setCantidad('');
        setCategoria('');
        setPrecio('');
        setEstado('');
        setFile('');
          setAlert({show: true, message: 'Producto Agregado con exito'})
      } catch (error) {
          console.error("Hubo un error al agregar el producto:", error.message);
          setAlert({show: true, message: 'Hubo error en registar el producto', variant: 'danger'})
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
          <Link to='/addcategoria' className="sidebar-link">Categoria</Link>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV' >Productos a Vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <Link  to='/visualizacion/venta' className="sidebar-link">Pedidos</Link>
          <Link to="/reportes" className="sidebar-link">Reports</Link>
          <a className="sidebar-link"><button onClick={CerrarSesion}>Cerrar Sesion</button></a>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
      </aside>
      <div className=' Alerta'>
      {alert.show && (
          <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
            {alert.message}
          </Alert>
        )}  
      </div>
      <div className="form-container-añadir">
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
        <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Imagen Producto</label>
                  <input
                    type="file"
                    className="form-control"
                    id="modalPrecio"
                    
                    onChange={CargarImagen}
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