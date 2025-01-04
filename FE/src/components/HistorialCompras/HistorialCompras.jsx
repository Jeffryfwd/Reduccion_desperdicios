import React, { useEffect, useState } from 'react'
import GetInfoCompras from '../../services/InfoUsuario/GetInfoCompras';
import { GetInfoUsuario, GetUserInfo } from '../../services/InfoUsuario/GetInfoUusuario';
import { Link } from 'react-router-dom';

function HistorialCompras() {
   const [compras, setCompras] = useState([]);    // Compras realizadas
   const [comprasAgrupadas, setComprasAgrupadas] = useState([]); // Compras agrupadas por fecha
  const [usuarios, setUsuario] = useState(null); // Datos completos
  const [userAlt, setUserAlt] = useState(null);  // Datos alternativos
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);      // Estado de error
  // Función para agrupar compras por fecha
  const agruparComprasPorFecha = (compras) => {
    const agrupadas = compras.reduce((acc, compra) => {
        const { Fecha_venta, Total, Cantidad_venta, id_producto, id_promociones } = compra;

        // Verifica si el producto existe
        const productoValido = id_producto || (id_promociones && id_promociones.id_producto);

      console.log('que ',productoValido);
      
        if (acc[Fecha_venta]) {
            acc[Fecha_venta].Total += parseFloat(Total);
            acc[Fecha_venta].Cantidad += parseInt(Cantidad_venta);

            // Solo agregar productos válidos
            if (productoValido) {
                acc[Fecha_venta].Productos.push({
                    Nombre: id_producto?.Nombre_producto || id_promociones.id_producto.Nombre_producto,
                    Imagen: id_producto?.Imagen_Producto || id_promociones.url_imagen
                    
                });
            }
        } else {
            acc[Fecha_venta] = {
                Fecha_venta,
                Total: parseFloat(Total),
                Cantidad: parseInt(Cantidad_venta),
                Productos: productoValido
                    ? [{
                        Nombre: id_producto?.Nombre_producto || id_promociones.id_producto.Nombre_producto,
                        Imagen: id_producto?.Imagen_Producto || id_promociones.url_imagen,
                        Cantidad: Cantidad_venta
                      }]
                    : [] // Lista vacía si el producto no es válido
            };
        }

        return acc;
    }, {});

    return Object.values(agrupadas);
};

console.log(comprasAgrupadas);

useEffect(()=>{
  const ObtenerCompras = async () => {
    try {
        // Obtener datos de compras
        const comprasRealizadas = await GetInfoCompras();
        setCompras(comprasRealizadas);

        // Agrupar compras por fecha
        const agrupadas = agruparComprasPorFecha(comprasRealizadas);
        setComprasAgrupadas(agrupadas); // Guardar compras agrupadas
    } catch (err) {
        console.error('Error al obtener compras:', err);
    }
};
  const ObtenerInfo = async () => {
            try {
                // Obtener datos del usuario
                const data = await GetInfoUsuario();
                setUsuario(data);
            } catch (err) {
                console.warn('Fallo la consulta principal, intentando consulta alternativa...');
                try {
                    const data2 = await GetUserInfo();
                    setUserAlt(data2);
                } catch (err2) {
                    setError('No se pudo obtener información del usuario.');
                }
            } finally {
                setLoading(false);
            }
        };
ObtenerInfo()
ObtenerCompras()
}, [])

  return (
    <div>
        <aside className="sidebar">
              {usuarios && usuarios.user ? (
          <h2>¡Hola {usuarios.user.first_name} {usuarios.user.last_name}!</h2>
      ) : userAlt ? (
          <h2>¡Hola {userAlt.first_name} {userAlt.last_name}!</h2>
      ) : (
          <p>No se pudo cargar el nombre del usuario.</p>
      )}
                  <nav>
                      <ul>
                          <li className="active">Información de la cuenta</li>
                          <Link to='/historial/compras'><li className='active'>Historial de órdenes</li></Link>
                          <li>Direcciones guardadas</li>
                          <li>Favoritos</li>
                          <li className="logout">Cerrar Sesión</li>
                      </ul>
                  </nav>
              </aside>
              <h2 className="compras-titulo">Compras Agrupadas por Fecha</h2>
<div className="compras-lista">
    {comprasAgrupadas.length > 0 ? (
        <table className="compras-tabla">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cantidad Total</th>
                    <th>Total</th>
                    <th>Acción</th>
                    <th>Productos</th>
                </tr>
            </thead>
            <tbody>
                {comprasAgrupadas.map((compra, index) => (
                    <tr key={index}>
                        <td>{compra.Fecha_venta}</td>
                        <td>{compra.Cantidad}</td>
                        <td>₡{compra.Total.toFixed(2)}</td>
                        <td>
                            <button 
                                className="ver-productos-btn"
                                onClick={() => console.log(`Ver productos comprados en ${compra.Fecha_venta}`)}>
                                Ver productos comprados
                            </button>
                        </td>
                        <td>
                            {compra.Productos.map((producto, idx) => (
                                <div key={idx} className="producto-item">
                                    <img 
                                        src={producto.Imagen} 
                                        alt={producto.Nombre} 
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                    <span>{producto.Nombre}</span>
                                    <span>(X{producto.Cantidad})</span>
                                </div>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No hay compras registradas.</p>
    )}
</div>


    </div>
  )
}

export default HistorialCompras