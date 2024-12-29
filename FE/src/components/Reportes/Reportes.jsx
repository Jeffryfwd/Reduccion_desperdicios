import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GetReportes from '../../services/Reportes/GetReportes';
import { Bar } from 'react-chartjs-2';

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reportes() {
  const [datosReportes, setDatosReportes] = useState({ ventas_15_dias: 0, ventas_mensuales: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReportes() {
      try {
        const data = await GetReportes();
        setDatosReportes(data);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setDatosReportes({ ventas_15_dias: 0, ventas_mensuales: 0 }); // Valores predeterminados
      }
    }
    fetchReportes();
  }, []);

  const data = {
    labels: ['Últimos 15 Días', 'Mensual'],
    datasets: [
      {
        label: 'Ventas en colones',
        data: [datosReportes.ventas_15_dias, datosReportes.ventas_mensuales],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const CerrarSesion = () => {
    localStorage.clear();
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
      <div>
        <h2>Reporte de Ventas</h2>
        {datosReportes.ventas_15_dias !== 0 || datosReportes.ventas_mensuales !== 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}

export default Reportes;
