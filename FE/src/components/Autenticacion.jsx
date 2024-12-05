// hooks/useAuth.js
import { useEffect } from 'react';
import {    jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Autenticacion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Función para verificar si el token ha expirado
    const verificarToken = () => {
      const token = localStorage.getItem('access-token');
      if (!token) {
        console.warn('No hay token en el localStorage');
        redirigirLogin();
        return;
      }

      try {
        // Decodificar el token y obtener la fecha de expiración
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        // Si el token ha expirado, limpiar el localStorage y redirigir al login
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.log('El token ha expirado. Redirigiendo al login...');
          redirigirLogin();
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        redirigirLogin();
      }
    };

    // Función para borrar el token y redirigir al login
    const redirigirLogin = () => {
      localStorage.clear(); // Borrar el token
      navigate('/'); // Redirigir al login
    };

    // Llamar a la función de verificación al montar el componente
    verificarToken();

    // Configurar un intervalo para verificar cada 5 minutos (300000ms)
    const interval = setInterval(() => {
      verificarToken();
    }, 5 * 60 * 1000); // Verificación cada 5 minutos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);

  }, [navigate]); // Se ejecuta solo una vez cuando se monta el componente y cuando se cambia el navigate
  

};

export default Autenticacion;
