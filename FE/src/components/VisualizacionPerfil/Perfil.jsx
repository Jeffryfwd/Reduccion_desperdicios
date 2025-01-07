import React, { useEffect, useState } from 'react';
import { GetInfoUsuario, GetUserInfo } from '../../services/InfoUsuario/GetInfoUusuario';
import PostInforUser from '../../services/InfoUsuario/PostInforUser'
import { Link } from 'react-router-dom';
import ModalEditarInfoUsuario from '../Modal/ModalEditarInfoUsuario';
import '../../css/Perfil.css'
import Footer from '../Footer/Footer';
import BotonPerfil from '../BotonPerfil/BotonPerfil';
import { useNavigate } from 'react-router-dom';

function Perfil() {
    const [usuarios, setUsuario] = useState(null); // Datos completos
    const [userAlt, setUserAlt] = useState(null);  // Datos alternativos
    const [loading, setLoading] = useState(true);  // Estado de carga
    const [error, setError] = useState(null);      // Estado de error
    const [form, setForm] = useState(false);       // Controlar el modal emergente
    const [abriModal, setAbrirModal]= useState(false)
    const navigate= useNavigate()
    const[Direccion_envio, setDireccionEnvio]= useState("")
    const [Numero_telefono, setNumeroTelefono]=useState("")


    const [userId, setUserId] = useState('');
    const [formState, setFormState] = useState({
        firstName: '',
        email: '',
        Direccion_envio: '',
        Numero_telefono: ''
    });

    

    // Campos del formulario
  
  
    

    useEffect(() => {
        const ObtenerInfo = async () => {
            try {
                // Intentar obtener datos del usuario principal
                const data = await GetInfoUsuario();
                setUsuario(data);
               
                setFormState({
                    firstName: data.user.first_name,
                    email: data.user.email,
                    Direccion_envio: data.Direccion_envio,
                    Numero_telefono: data.Numero_telefono
                });
                 // Obtener y establecer el ID del usuario
                 const id = localStorage.getItem('Id_user') || data.user.id;
                 setUserId(id);
            } catch (err) {
                console.warn('Fallo la consulta principal, intentando consulta alternativa...');
                setForm(true); // Mostrar modal del formulario
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
        ObtenerInfo();
        function SetearId() {
            const id = localStorage.getItem('Id_user');
            setUserId(id)
        }
        SetearId()
    }, []); // Ejecutar solo al cargar el componente
   
    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await PostInforUser(userId, Direccion_envio, Numero_telefono)
        setForm(false)
        alert('Informacion')
     
    };
    const EditarUsuario = async (e) => {
        e.preventDefault();
        // Recupera el ID desde localStorage
        try {
            const userData = {
                user_id: userId, // Aquí se envía el ID del usuario
                first_name: formState.firstName.trim(),
                email: formState.email.trim(),
                Direccion_envio: formState.Direccion_envio.trim(),
                Numero_telefono: formState.Numero_telefono.trim(),
            };
               const response = await fetch('http://127.0.0.1:8000/api/editar/usuario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const result = await response.json();
    
            if (result.success) {
                alert('Usuario actualizado correctamente');
                setAbrirModal(false)
            
            } else {
                alert('Error al actualizar el usuario: ' + result.error);
            }
            const actualizado = await GetInfoUsuario()
            setUsuario(actualizado)
    
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el usuario.');
        }
      
    };
    function CerrarSesion() {
        localStorage.clear()
        navigate('/')
      }
    

    // Mostrar mientras carga
    if (loading) return <p>Cargando información...</p>;

    // Mostrar error
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
                 <div className="navbar-categories">
  <ul className="categories-list">{<BotonPerfil/>}

    <li className="category-item">
      <Link to='/'><button className="category-button">Pagina Principal</button></Link>
    </li>
 <li className="category-item">
      <Link to='/acercade'><button className="category-button">Acerca de nosotros</button></Link>
    </li>
<li className="category-item">
      <Link to='/contactenos'><button className="category-button">Contactenos</button></Link>
    </li>
    
   
<li className="carrito-item"></li>
</ul>
</div>
         <br />
        <div className="perfil-layout">
       
            {/* Modal para formulario emergente */}
            {form && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Completar Información</h2>
                        <form onSubmit={handleSubmit} className="perfil-form">
                        <div>
                                <label>Id</label>
                                <input
                                    type="text"
                                    value={userId}
                                     onChange={(e) => setUserId(e.target.value)}
                                     readOnly
                                    
                                />
                            </div>
                            <div>
                                <label>Dirección de Envío:</label>
                                <input
                                    type="text"
                                    value={Direccion_envio}
                                    onChange={(e) => setDireccionEnvio(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label>Número de Teléfono:</label>
                                <input
                                    type="text"
                                    value={Numero_telefono}
                                    onChange={(e) => setNumeroTelefono(e.target.value)}
                                    required
                                />
                            </div>
                          
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            )}
       <ModalEditarInfoUsuario isOpen={abriModal} onClose={() => setAbrirModal(false)}>
    <form onSubmit={EditarUsuario}>
        <label htmlFor="firstName">Nombre:</label>
        <input
            type="text"
            id="firstName"
            value={formState.firstName}
            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />

        <label htmlFor="direccionEnvio">Dirección de Envío:</label>
        <input
            type="text"
            id="direccionEnvio"
            value={formState.Direccion_envio}
            onChange={(e) => setFormState({ ...formState, Direccion_envio: e.target.value })}
        />

        <label htmlFor="numeroTelefono">Número de Teléfono:</label>
        <input
            type="text"
            id="numeroTelefono"
            value={formState.Numero_telefono}
            onChange={(e) => setFormState({ ...formState, Numero_telefono: e.target.value })}
        />

        <button type="submit">Guardar Cambios</button>
    </form>
</ModalEditarInfoUsuario>


            {/* Menú Lateral */}
            <aside className="sidebar-Perfil">
                {usuarios && usuarios.user ? (
                    <h2>¡Hola {usuarios.user.first_name} {usuarios.user.last_name}!</h2>
                ) : userAlt ? (
                    <h2>¡Hola {userAlt.first_name} {userAlt.last_name}!</h2>
                ) : (
                    <p>No se pudo cargar el nombre del usuario.</p>
                )}
                <nav>
                    <ul>
                       <Link to='/perfil' className='link'> <li className="link">Información de la cuenta</li></Link>
                        <Link to='/historial/compras' className='link'><li className='link'>Historial de Compras</li></Link>
                       <li className="logout" onClick={()=> CerrarSesion()}>Cerrar Sesión</li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido Principal */}
          <main className="perfil-contenido">
    <h1>Información de la cuenta</h1>
    <div className="perfil-seccion">
        <h2 className="info-titulo">Información Personal</h2>
        {usuarios ? (
            <div className="info-card-perfil-sesion">
                <div className="info-detalle">
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg> <i className="fas fa-user"></i>
                        {usuarios.user.first_name} {usuarios.user.last_name}
                    </p>
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg><i className="fas fa-envelope"></i>
                        {usuarios.user.email}
                    </p>
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg> <i className="fas fa-phone"></i>
                       +506 {usuarios.Numero_telefono}
                    </p>
                </div>
                <button className="editar-perfil" onClick={() => setAbrirModal(true)}>
                    Editar
                </button>
            </div>
        ) : userAlt ? (
            <div className="info-card-alternativa">
                <div className="info-detalle">
                    <p>
                        <i className="fas fa-user"></i>
                        {userAlt.first_name} {userAlt.last_name}
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i>
                        {userAlt.email}
                    </p>
                </div>
                <button className="editar-alternativa">Editar</button>
            </div>
        ) : (
            <p>No se pudo cargar la información del usuario.</p>
        )}
    </div>
</main>
       
        
        </div>
        <Footer/>
        </div>
        
    );
}

export default Perfil;
