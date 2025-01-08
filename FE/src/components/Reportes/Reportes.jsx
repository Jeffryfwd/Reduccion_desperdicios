import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GetReportes from '../../services/Reportes/GetReportes';
import { Bar } from 'react-chartjs-2';
import '../../css/Reporte.css'

// Registro de componentes de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Se registran los componentes necesarios de ChartJS para crear gráficos.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function Reportes() {

  
  // contiene las ventas de los últimos 15 días y las ventas mensuales.
  const [datosReportes, setDatosReportes] = useState({ ventas_15_dias: 0, ventas_mensuales: 0 });

  
  const navigate = useNavigate();


  useEffect(() => {

    // Función asíncrona para obtener los datos de reportes .
    async function fetchReportes() {
      try {
        // Se llama a la función 'GetReportes' que obtiene los datos desde el backend.
        const data = await GetReportes();

        // Se actualiza el estado 'datosReportes' con los datos obtenidos.
        setDatosReportes(data);
      } catch (error) {
        // En caso de error, se muestra el mensaje en consola.
        console.error('Error al obtener reportes:', error);

        // Si ocurre un error, se establecen valores predeterminados para evitar errores en el gráfico.
        setDatosReportes({ ventas_15_dias: 0, ventas_mensuales: 0 });
      }
    }

    // Se llama a la función para obtener los datos al montar el componente.
    fetchReportes();

  // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente.
  }, []);

  // Configuración de los datos del gráfico.
  const data = {
    // Etiquetas para las categorías del gráfico (Eje X).
    labels: ['Últimos 15 Días', 'Mensual'],

    // Datos del conjunto de barras que se mostrará en el gráfico.
    datasets: [
      {
        label: 'Ventas en colones', // Etiqueta para el gráfico.
        data: [datosReportes.ventas_15_dias, datosReportes.ventas_mensuales], // Valores obtenidos del estado.
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',   // Color para la barra de ventas de los últimos 15 días.
          'rgba(153, 102, 255, 0.6)'  // Color para la barra de ventas mensuales.
        ],
      }
    ]
  };

  // Configuración de opciones para personalizar el gráfico.
  const options = {
    responsive: true, // Hace que el gráfico sea responsivo (se adapte al tamaño de pantalla).
    scales: {
      y: {
        beginAtZero: true, // El eje Y comienza en 0.
      },
    },
  };

  // Función para cerrar sesión.
  const CerrarSesion = () => {
    // Se eliminan todos los datos almacenados en el almacenamiento local.
    localStorage.clear();

    // Se redirecciona al usuario a la página de inicio de sesión.
    navigate('/login');
  };





  return (
    <div>
      <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
          <Link className="sidebar-link" to='/principal'>Lista de productos</Link>
          <Link to='/addcategoria' className="sidebar-link">Categoria</Link>
          <Link className="sidebar-link" to='/añadir'>Añadir productos</Link>
          <Link className="sidebar-link" to='/principal/adminV'>Productos a vencer</Link>
          <Link to="/promociones" className="sidebar-link">Promociones</Link>
          <Link to='/visualizacion/venta' className="sidebar-link">Pedidos</Link>
          <Link to="/reportes" className="sidebar-link">Reports</Link>
          <p className="sidebar-link"><button onClick={CerrarSesion}>Cerrar Sesión</button></p>
          <Link to="/systemManagement" className="sidebar-link">System Management</Link>
        </nav>
      </aside>
  <div className="reporte-container">
  <h2 className="reporte-titulo">Reporte de Ventas</h2>
  {datosReportes.ventas_15_dias !== 0 || datosReportes.ventas_mensuales !== 0 ? (
    <div className="reporte-grafico">
      <Bar data={data} options={options} />
    </div>
  ) : (
    <p className="reporte-cargando">Cargando datos...</p>
  )}
</div>

    </div>
  );
}

export default Reportes;
