import React, { useEffect, useState } from 'react';
import { GetInfoUsuario, GetUserInfo } from '../../services/InfoUsuario/GetInfoUusuario';
import PostInforUser from '../../services/InfoUsuario/PostInforUser'
import { Link } from 'react-router-dom';
import { UploadFile } from '../../Firebase/config';

function Perfil() {
    const [usuarios, setUsuario] = useState(null); // Datos completos
    const [userAlt, setUserAlt] = useState(null);  // Datos alternativos
    const [loading, setLoading] = useState(true);  // Estado de carga
    const [error, setError] = useState(null);      // Estado de error
    const [form, setForm] = useState(false);       // Controlar el modal emergente

    // Campos del formulario
    const [Direccion_envio, setDireccionEnvio] = useState('');
    const [Numero_telefono, setNumeroTelefono] = useState('');
    const [user, setID]= useState("")
    const [Foto_perfil, setFile] = useState("");

    useEffect(() => {
        const ObtenerInfo = async () => {
            try {
                // Intentar obtener datos del usuario principal
                const data = await GetInfoUsuario();
                setUsuario(data);
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
            setForm(id)
        }
        SetearId
    }, []); // Ejecutar solo al cargar el componente
    const CargarImagen=async(e)=>{
          const file= e.target.files[0]
          setFile(file)
          if (file) {
            const resultado= await UploadFile(file);
            setFile(resultado)
          }
        }
    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await PostInforUser(user, Direccion_envio, Foto_perfil, Numero_telefono)
        setForm(false)
        alert('Informacion')
     
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
                                    value={user}
                                     onChange={(e) => setID(e.target.value)}
                                    
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
                            <div>
                                <label>Foto de Perfil:</label>
                                <input
                                    type="file"
                                    
                                    onChange={CargarImagen}
                                />
                            </div>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            )}

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
                        <li className="active">Información de la cuenta</li>
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
                         
                            <button className="editar">Editar</button>
                        </div>
                    ) : userAlt ? (
                        <div className="info-card">
                            <p><strong>Nombre:</strong> {userAlt.first_name} {userAlt.last_name}</p>
                            <p><strong>Email:</strong> {userAlt.email}</p>
                            
                            <button className="editar">Editar</button>
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
