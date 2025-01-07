import React, { useEffect, useState } from 'react';
import { DeleteProducts, GetProducts, PutProduct } from '../../services/GetProducts'
import { Link, useNavigate } from 'react-router-dom';
import Autenticacion from '../Autenticacion';
import { Alert } from 'react-bootstrap'


function Principal() {
  Autenticacion()
  const [ListaProductos, setProductos] = useState([]); // Estado inicializado como array vacío.
  const [datosModal, setModal] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [alert, setAlert]= useState({show: false, message: '', variant: ''})
  const navigate= useNavigate();
  

  useEffect(() => {
    async function ObtenerProductos() {
      const productos = await GetProducts(); // Llama a la función de servicios para obtener los productos.
      setProductos(productos); // Actualiza el estado con los datos obtenidos.
    }
    ObtenerProductos();
  }, []);

  console.log(datosModal)

  function AbrirModal(product) {
    setModal(product);
    setAbrirModal(true);
  }


//Creamos una funcion de editar productos
  async function EditarProducto() {
    const { id, Nombre_producto, Fecha_vencimiento,Cantidad, Precio,Categoria,Estado} = datosModal; //Hago una destructuracion de datos
    try {
      await PutProduct(id, Nombre_producto, Fecha_vencimiento,Cantidad, Precio, Categoria,Estado); // llamamos esta operacion asincronica
      const productoActualizado = await GetProducts();
      setProductos(productoActualizado);
      setAlert({show: true, message: '¡Producto Actualizado con exito!'})
      setAbrirModal(false);
    } catch (error) {
      setAlert({show: true, message: '¡Hubo un error al actualizar el producto!', variant:'danger'})
      
    }
   
   
    
  }

  //Funcion de eliminar productos
  async function EliminarProductos(id) {
    try {
      await DeleteProducts(id); // operacion asincronica
      const ListaActualizada= await GetProducts();
      setAlert({show: true, message: '¡Producto Eliminado con exito!'})
      setProductos(ListaActualizada) //Actulizamos el estado
    } catch (error) {
      setAlert({show: true, message: '¡Hubo un erro al eliminar el producto!', variant:'danger'})
      
    }
   
    
    
  }
  console.log(ListaProductos);

  //Funcion de cerrar sesion
  const CerrarSesion=()=>{
    localStorage.clear()
    setAlert({show: true, message: '¡Cerrando sesion!', variant:'warning'})
    navigate('/login')
    
  }


  return (
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
          <p className="sidebar-link" ><button onClick={CerrarSesion}>Cerrar Sesion</button></p>
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

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="header-title">ViewProduct</h1>
          <div className="header-actions">
            <input type="text" className="search-input" placeholder="Search Product" />
            <button className="search-button">Search</button>
          </div>
        </header>
        
        {/* Product Grid */}
        <section className="product-gridlist">
  {ListaProductos.length > 0 ? (
    <table className="product-table">
      <thead>
        <tr>
          
          <th>Nombre</th>
          <th>Fecha de Vencimiento</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ListaProductos.map((Prod) => (
          //Key identificador unico para cada fila y Prod.id indenticador unico para cada producto
          <tr key={Prod.id}>  
            
            <td>{Prod.Nombre_producto || 'Sin nombre'}</td>
            <td>{Prod.Fecha_vencimiento || 'No disponible'}</td>
            <td>{Prod.Cantidad || 'No disponible'}</td>
            <td>{Prod.Precio || 'No disponible'}</td>
            <td>{Prod.Estado || 'No disponible'}</td>
            <td>{Prod.Categoria.Categoria || 'No disponible'}</td>
            <td>
            <td>
           <button className="btn-edit" onClick={() => AbrirModal(Prod)}>Editar</button> 
           <button className="btn-delete" onClick={() => EliminarProductos(Prod.id)}>Eliminar</button>
</td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Cargando productos...</p>
  )}
</section>

      </main>
      
      {abrirModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Editar Producto</h5>
                <button type="button" className="close" onClick={() => setAbrirModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="modalNombre" className="form-label">Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalNombre"
                    value={datosModal.Nombre_producto || ''}
                    onChange={(e) => setModal({ ...datosModal, Nombre_producto: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalDescripcion" className="form-label">Fecha de Vencimiento</label>
                  <textarea
                    className="form-control"
                    id="modalDescripcion"
                    value={datosModal.Fecha_vencimiento || ''}
                    onChange={(e) => setModal({ ...datosModal, Fecha_vencimiento: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="modalPrecio"
                    value={datosModal.Cantidad || ''}
                    onChange={(e) => setModal({ ...datosModal, Cantidad: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    id="modalPrecio"
                    value={datosModal.Precio || ''}
                    onChange={(e) => setModal({ ...datosModal, Precio: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalPrecio"
                    value={datosModal.Estado || ''}
                    onChange={(e) => setModal({ ...datosModal, Estado: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalPrecio"
                    value={datosModal.Categoria.Categoria  || ''}
                    onChange={(e) => setModal({ ...datosModal, Categoria: e.target.value })}
                  />
                </div>
              
             
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAbrirModal(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={EditarProducto}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Principal;

