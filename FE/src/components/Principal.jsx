import React, { useEffect, useState } from 'react';
import { DeleteProducts, GetProducts, PutProduct } from '../services/GetProducts'
import { Link } from 'react-router-dom';


function Principal() {
  const [ListaProductos, setProductos] = useState([]); // Estado inicializado como array vacío.
  const [datosModal, setModal] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    async function ObtenerProductos() {
      const productos = await GetProducts(); // Llama a la función de servicios para obtener los productos.
      setProductos(productos); // Actualiza el estado con los datos obtenidos.
    }
    ObtenerProductos();
  }, []);

  function AbrirModal(product) {
    setModal(product);
    setAbrirModal(true);
  }
  async function EditarProducto() {
    const { id, Nombre_producto, Fecha_vencimiento,Cantidad, Precio,Categoria,Estado} = datosModal;
    await PutProduct(id, Nombre_producto, Fecha_vencimiento,Cantidad, Precio, Categoria,Estado);
    const productoActualizado = await GetProducts();
    setProductos(productoActualizado);
    alert("Se a editado correctamente el producto")
    setAbrirModal(false);
  }

  async function EliminarProductos(id) {
    await DeleteProducts(id);
    alert("Producto eliminado con exito")
    const ListaActualizada= await GetProducts();
    setProductos(ListaActualizada)
    
    
  }
  console.log(ListaProductos);


  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
          <Link  className="sidebar-link" to='/principal'>View Product</Link>
          <a href="#category" className="sidebar-link">Category</a>
          <Link  className="sidebar-link" to='/añadir' >Add Product</Link>
          <a href="#reports" className="sidebar-link">Reports</a>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
      </aside>

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
        <section className="product-grid">
          {ListaProductos.length > 0 ? (
            ListaProductos.map((Prod) => (
              <div key={Prod.id} className="product-card">
                <div className="product-image-placeholder">
                  Imagen aquí {/* Puedes agregar una imagen real */}
                </div>
                <h3 className="product-name">{Prod.Nombre_producto || 'Sin nombre'}</h3>
                <p className="product-info">Fecha de vencimiento: {Prod.Fecha_vencimiento || 'No disponible'}</p>
                <p className="product-info">Cantidad: {Prod.Cantidad || 'No disponible'}</p>
                <p className="product-info">Precio: {Prod.Precio || 'No disponible'}</p>
                <p className="product-info">Estado: {Prod.Estado || 'No disponible'}</p>
                <p className="product-info">
  Categoria: {Prod.Categoria && Prod.Categoria.Categoria ? Prod.Categoria.Categoria : 'No disponible'}
</p>

                <button onClick={() => AbrirModal(Prod)}>Editar</button>
                <button onClick={()=>EliminarProductos(Prod.id)}>Eliminar</button>
              </div>
            ))
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
                    value={datosModal.Categoria || ''}
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

