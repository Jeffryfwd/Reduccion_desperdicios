import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GetVencer } from '../../services/GetProducts';
import Postpromociones from '../../services/Promociones/PostPromociones'




function Principal() {
    const[Productos, setProductos]= useState([])
    const [alertas, setalerta]= useState([])
    const [datosModal, setModal] = useState([]);

    const [abrirModal, setAbrirModal] = useState(false);

    const [Fecha_inicio, setFechaInicio]= useState("")
    const [Fecha_fin, setFechaFin]= useState("")
    const[id_producto, setIdproducto]= useState("")
    const[descuento, setDescuento]= useState("")

    useEffect(()=>{
        const ObtenerProductos = async()=>{
            const ProductosVnecer= await GetVencer()
            setProductos(ProductosVnecer)
            const alertasGeneradas = ProductosVnecer.map(producto => { //Recorro el array pronto a vencer donde estan los productos pronto a vencer
                const fechaVencimiento = new Date(producto.Fecha_vencimiento); // convierto la fecha de vencimiento en un objeto y le añado date para trabajar en el
                const hoy = new Date();
                const diasRestantes = (fechaVencimiento - hoy) / (1000 * 3600 * 24); //calculo la diferencia entre la fecha de vencimiento y la actual
                return { // Y creo un objeto alerta lo cual cada producto pronto a vencer crea un objeto con sus atributos
                    id: producto.id,
                    nombre: producto.Nombre_producto,
                    diasRestantes,
                    alerta: diasRestantes <= 15 && diasRestantes > 0

                };
            });
            setalerta(alertasGeneradas.filter(alerta => alerta.alerta));
        }
        
        ObtenerProductos()
    },[])
    
    // async function ObtenerId(id) {
    //   const Id = await GetVencer()
    //   setIdproducto(Id)
    // }

    function AbrirModal(product) {
      setModal(product);
      setIdproducto(product.id);
      setAbrirModal(true);
    }
    
    async function AñadirPromocion() {
      await Postpromociones(id_producto, Fecha_inicio, Fecha_fin, descuento)
    }
  return (
    <div>
          <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
          <Link  className="sidebar-link" to='/principal'>View Product</Link>
          <a  href="#category" className="sidebar-link">Category</a>
          <Link  className="sidebar-link" to='/añadir' >Add Product</Link>
          <Link  className="sidebar-link" to='/vencimiento' >Productos a Vencer</Link>

          <a href="#reports" className="sidebar-link">Reports</a>
          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
      </aside>
      <div className="productos-vencer">
    <h1 className="titulo">Productos Pronto a Vencer</h1>

    <table className="tabla-productos">
        <thead>
            <tr className="encabezado-tabla">
                <th className="columna-nombre">Nombre del Producto</th>
                <th className="columna-fecha">Fecha de Vencimiento</th>
                <th className="columna-cantidad">Cantidad</th>
                <th className="columna-dias">Días Restantes</th>
                <th>Accion</th>
            </tr>
        </thead>
        <tbody>
            {Productos.map(product => (
                <tr key={product.id} className="fila-producto">
                    <td className="dato-nombre">{product.Nombre_producto}</td>
                    <td className="dato-fecha">{product.Fecha_vencimiento}</td>
                    <td className="dato-cantidad">{product.Cantidad}</td>
                    <td className="dato-alerta">
                        {alertas.length > 0 ? (
                            alertas.map(alerta => (
                                <span key={alerta.id} className="alerta">
                                    Vence en {Math.round(alerta.diasRestantes)} días
                                </span>
                            ))
                        ) : (
                            <p className="no-alerta">Sin alertas de vencimiento</p>
                        )}
                    </td>
                    <td>
                      <button onClick={() => AbrirModal(product)}>Crear promocion</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
{abrirModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Agregar promoción</h5>
                <button type="button" className="close" onClick={() => setAbrirModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="modalNombre" className="form-label">Producto</label>
                  <input
                    type="null"
                    className="form-control"
                    id="modalNombre"
                    value={id_producto }
                    onChange={(e) => setIdproducto({...datosModal, id_producto: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalDescripcion" className="form-label">Fecha de inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    id="modalDescripcion"
                    value={Fecha_inicio || ''}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Fecha finalización</label>
                  <input
                    type="date"
                    className="form-control"
                    id="modalPrecio"
                    value={Fecha_fin || ''}
                    onChange={(e) => setFechaFin(e.target.value )}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Descuento</label>
                  <input
                    type="number"
                    className="form-control"
                    id="modalPrecio"
                    value={descuento|| ''}
                    onChange={(e) => setDescuento(e.target.value )}
                  />
                </div>
               
              
             
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAbrirModal(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={AñadirPromocion}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
     

    </div>
  )
}

export default Principal