import React, { useEffect, useState } from 'react';
import { GetInfoUsuario, GetUserInfo } from '../../services/InfoUsuario/GetInfoUusuario';
import PostInforUser from '../../services/InfoUsuario/PostInforUser'
import { Link } from 'react-router-dom';
import ModalEditarInfoUsuario from '../Modal/ModalEditarInfoUsuario';

function Perfil() {
    const [usuarios, setUsuario] = useState(null); // Datos completos
    const [userAlt, setUserAlt] = useState(null);  // Datos alternativos
    const [loading, setLoading] = useState(true);  // Estado de carga
    const [error, setError] = useState(null);      // Estado de error
    const [form, setForm] = useState(false);       // Controlar el modal emergente
    const [abriModal, setAbrirModal]= useState(false)
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
            } else {
                alert('Error al actualizar el usuario: ' + result.error);
            }
    
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el usuario.');
        }
      
    };
    
    

    // Mostrar mientras carga
    if (loading) return <p>Cargando información...</p>;

    // Mostrar error
    if (error) return <p>Error: {error}</p>;

    return (
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
                       <Link to='/perfil'> <li className="active">Información de la cuenta</li></Link>
                        <Link to='/historial/compras'><li className='active'>Historial de órdenes</li></Link>
                        <li>Direcciones guardadas</li>
                        <li>Favoritos</li>
                        <li className="logout">Cerrar Sesión</li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main className="perfil-contenido">
                <h1>Información de la cuenta</h1>
                <div className="perfil-seccion">
                    <h2>Información Personal</h2>
                    {usuarios ? (
                        <div className="info-card">
                            <p><strong>Nombre:</strong> {usuarios.user.first_name} {usuarios.user.last_name}</p>
                            <p><strong>Email:</strong> {usuarios.user.email}</p>
                            <p><strong>Teléfono:</strong> {usuarios.Numero_telefono}</p>
                            <p><strong>Direccion de envio:</strong> {usuarios.Direccion_envio}</p>
                         
                            <button className="editar" onClick={()=> setAbrirModal(true)} >Editar</button>
                        </div>
                    ) : userAlt ? (
                        <div className="info-card">
                            <p><strong>Nombre:</strong> {userAlt.first_name} {userAlt.last_name}</p>
                            <p><strong>Email:</strong> {userAlt.email}</p>
                            
                            <button className="editar" >Editar</button>
                           
                        </div>
                    ) : (
                        <p>No se pudo cargar la información del usuario.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Perfil;
