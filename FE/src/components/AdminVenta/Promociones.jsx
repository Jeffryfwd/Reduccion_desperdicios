import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GetPromociones from '../../services/Promociones/GetPromociones'
import DeletePromociones from '../../services/Promociones/DeletePromociones';
import PutPromociones from '../../services/Promociones/PutPromociones';
import Autenticacion from '../Autenticacion';



function Promociones() {
  Autenticacion()
const [LitaPromociones, setListaPromociones]= useState([])
const [DatosPromocion, SetDatosPromocion]= useState([])
 const [abrirModal, setAbrirModal] = useState(false);

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
  navigate('/login')
  
}
async function EliminarPromociones(id) {
  await DeletePromociones(id);
  alert("Producto eliminado con exito")
  const ListaActualizada= await GetPromociones();
  setListaPromociones(ListaActualizada)
}

function AbrirModal(product) {
  SetDatosPromocion(product);
  setAbrirModal(true);
}

async function EditarPromocion() {
  const {id_producto,url_imagen, Descuento, Fecha_inicio, Fecha_fin, Precio_total} = DatosPromocion;
  try {
    await PutPromociones(id_producto,url_imagen,Descuento,Fecha_inicio,Fecha_fin, Precio_total)
    const PromocionActualizada= GetPromociones()
    setListaPromociones(PromocionActualizada)
    alert('Promocion editada con exito')
  } catch (error) {
    
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
        <button className="btn-edit" onClick={()=>AbrirModal(Promo)}>Editar</button>
      </div>
    </div>
  ))}
</div>

  
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
                  <label htmlFor="modalNombre" className="form-label">Id Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalNombre"
                    value={DatosPromocion.id_producto.id || ''}
                    // onChange={(e) => SetDatosPromocion({ ...DatosPromocion, Nombre_producto: e.target.value })}
                  />
                </div>
              
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Fecha Inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    id=""
                    value={DatosPromocion.Fecha_inicio || ''}
                    // onChange={(e) => setModal({ ...datosModal, Cantidad: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Fecha fin</label>
                  <input
                    type="date"
                    className="form-control"
                    id="modalPrecio"
                     value={DatosPromocion.Fecha_fin || ''}
                    // onChange={(e) => setModal({ ...datosModal, Precio: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Descuento</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalPrecio"
                    value={DatosPromocion.Descuento|| ''}
                    // onChange={(e) => setModal({ ...datosModal, Estado: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Precio Total</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalPrecio"
                    value={DatosPromocion.Precio_total || ''}
                    // onChange={(e) => setModal({ ...datosModal, Categoria: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Imagen Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalPrecio"
                    value={DatosPromocion.url_imagen|| ''}
                    // onChange={(e) => setModal({ ...datosModal, Categoria: e.target.value })}
                  />
                </div>
              
             
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAbrirModal(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={EditarPromocion}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Promociones