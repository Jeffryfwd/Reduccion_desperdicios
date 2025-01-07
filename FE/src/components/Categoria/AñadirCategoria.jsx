import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCategoria from '../../services/SCategoria/PostCategoria'
import GetCategoria from '../../services/GetCategoria'
import DeleteCategoria from '../../services/DeleteCategoria'
import PutCategoria from '../../services/SCategoria/PutCategoria'
import '../../css/Categoria.css'
import { Alert } from 'react-bootstrap'
function AñadirCategoria() {
    const [Categoria, setCategoria]= useState("")
    const [ListaCategoria, setListaCategoria]=useState([])
    const [DatoCategoria, setDatoCategoria]= useState([])
    const [alert, setAlert]= useState({show: false, message: '', variant: ''})



useEffect(()=>{
const ObtenerCategorias = async () => {
  try {
    const Categorias = await GetCategoria();
    setListaCategoria(Categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
  } 
};

ObtenerCategorias()

},[])

    const CargarCategoria=(e)=>{
        setCategoria(e.target.value)
    }

    const SeleccionarCategoria = (Cate) => { 
    //Guardo toda la categoria seleccionada en el estado DatoCategoria
      setDatoCategoria(Cate)
      setCategoria(Cate.Categoria) // Carga el nombre al input
  }  

 const AddCategoria= async(e)=>{
  e.preventDefault();
  try {
    if (DatoCategoria.id) {
        // Actualiza la categoría si existe un ID
        await PutCategoria(DatoCategoria.id, Categoria)
        alert('Categoría actualizada con éxito')
    } else {
        // Agrega una nueva categoría si no existe ID
        await PostCategoria(Categoria)
        alert('Categoría agregada con éxito')
    }

    const ListaActualizada = await GetCategoria()
    setListaCategoria(ListaActualizada)
    setCategoria("")
    setDatoCategoria({ id: null, Categoria: "" }) // Resetea el formulario
} catch (error) {
    console.log('Hubo un error en añadir o editar la categoría', error);
}
   
    
 }
    const CerrarSesion=()=>{
        localStorage.clear()
        navigate('/')
        
      }
  
      async function Eliminar(id) {
        try {
          await DeleteCategoria(id)
          const ListaActualizada= await GetCategoria()
          setListaCategoria(ListaActualizada)
          setAlert({show: true, message: '¡Categoria Eliminada exitosamente!'})

        } catch (error) {
          setAlert({show: true, message: 'Hubo error en eliminar la categoria', variant: 'danger'})
        
          
        }
       
      }
      async function EditarCategoria() {
        const {id, Categoria} = DatoCategoria;
        try {
          await PutCategoria(id, Categoria)
          
          const CategriaActulizada= GetCategoria()
          setListaCategoria(CategriaActulizada)
          setAlert({show: true, message: 'Categoria acyualizada con exito'})

        } catch (error) {
          setAlert({show: true, message: 'Hubo error en actualizar la categoria', variant: 'danger'})
          
        }
       
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
        <div className=' Alerta'>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}  
            </div>
      <div className="contenedor-principal">
  <div className="form-container">
    <form className="category-form" onSubmit={AddCategoria}>
      <h2 className="form-title">Agregar Categoría</h2>
      <div className="form-group">
        <label htmlFor="" className="form-label">Nombre de la categoría</label>
        <input 
          type="text" 
          className="form-input"
          value={Categoria}
          onChange={CargarCategoria}
        />
      </div>
      <button type="submit" className="form-submit" onClick={()=>EditarCategoria()}>Añadir Categoría</button>
    </form>
  </div>
  <div className="table-container">
    <div className='Tabla-2'>
    <table className="table-categoria">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Categoría</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {ListaCategoria.map((Cate) => (
          <tr key={Cate.id}>
            <td>{Cate.id}</td>
            <td>{Cate.Categoria}</td>
            <td> 
            <button
            className="edit-button"
            onClick={() => SeleccionarCategoria(Cate)}>EDITAR</button>
            <button className="delete-button" onClick={() => Eliminar(Cate.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
</div>

      
    </div>
  )
}

export default AñadirCategoria