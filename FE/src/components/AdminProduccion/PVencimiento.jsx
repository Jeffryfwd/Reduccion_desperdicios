import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GetVencer } from '../../services/GetProducts';

function PVencimiento() {
    const [productos, setproductos]= useState([])
    const [alertas, setalerta]= useState([])

    useEffect(()=>{
        const ObtenerProductos= async()=>{
            const prontoVencer= await GetVencer() //Obtengo los productos 
            setproductos(prontoVencer) //Los inserto en mi hooks
            const alertasGeneradas = prontoVencer.map(producto => { //Recorro el array pronto a vencer donde estan los productos pronto a vencer
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
            setalerta(alertasGeneradas.filter(alerta => alerta.alerta)); //recorro el el array y devuelve unicamente los productos a vencer en el hooks alertas para mostrarlas
        }
        ObtenerProductos()

    },[])

    const CerrarSesion=()=>{
        localStorage.clear()
        navigate('/')
        
      }
  return (
    <div  >
        <aside className="sidebar">
    <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
    <nav className="sidebar-nav">
      <Link  className="sidebar-link" to='/principal'>View Product</Link>
      <a  href="#category" className="sidebar-link">Category</a>
      <Link  className="sidebar-link" to='/añadir' >Add Product</Link>
      <Link  className="sidebar-link" to='/vencimiento' >Productos a Vencer</Link>

      <a href="#reports" className="sidebar-link">Reports</a>
      <p  className="sidebar-link" onClick={CerrarSesion}>Cerrar Sesion</p>

      <a href="#systemManagement" className="sidebar-link">System Management</a>
    </nav>
  </aside>
  <div className='contenVenci'>
  <h1 className="productos-titulo">Productos Pronto a Vencer</h1>

<table className="productos-tabla">
    <thead>
        <tr>
            <th className="tabla-header">Nombre</th>
            <th className="tabla-header">Fecha de Vencimiento</th>
        </tr>
    </thead>
    <tbody>
        {productos.map(producto => (
            <tr key={producto.id} className="tabla-fila">
                <td className="tabla-dato">{producto.Nombre_producto}</td>
                <td className="tabla-dato">{producto.Fecha_vencimiento}</td>
            </tr>
        ))}
    </tbody>
</table>

{/* Alertas */}
<h2 className="alertas-titulo">Alertas de Vencimiento</h2>
<ul className="alertas-lista">
    {alertas.length > 0 ? (
        alertas.map(alerta => (
            <li key={alerta.id} className="alerta-item">
                Producto: {alerta.nombre} - Vence en {Math.round(alerta.diasRestantes)} días
            </li>
        ))
    ) : (
        <p className="no-alerta">No hay productos próximos a vencer.</p>
    )}
</ul>
</div>

  </div>
  )
}

export default PVencimiento