import React from 'react'
import { useState } from 'react'
import token from '../services/token'
import GetUsuario2 from '../services/GetUsuario'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'
import { Alert } from 'react-bootstrap'

function FormLogin() {
    const[username, setUsername]= useState("")
    const[password, setPassword]= useState("")
    const [alert, setAlert]= useState({show: false, message: '', variant: ''})
    
    const Navigate= useNavigate();

    const CargarUsername=(event)=>{
        setUsername(event.target.value)

    }
    const CargarPassword= (event)=>{
        setPassword(event.target.value)
    }
    async function BuscarAdmin(username, password) {
       try {
        const usuarios= await GetUsuario2();
        console.log(usuarios);
        
            const usuario= usuarios.find(user=> user.username===username);

            if (usuario && usuario.is_staff) {
                console.log('Admin encontrado', usuario);
                localStorage.setItem('Autenticado', 'Admin')
                return true
                
                
            }else {
                console.log('No se encontro admin');
                return false;
                
            }
       } catch (error) {
            console.log('Error al encontrar admin', error);
            
       }
    }

    const IniciarSesion= async(event)=>{
        event.preventDefault()

        try {
            if (username === '' || password === '') {
                setAlert({ 
                    show: true, 
                    message: '¡Rellena todos los espacios!', 
                    variant: 'danger' 
                });
                console.log('alerta', alert);
                return; // Detenemos la ejecución aquí
            }
            

            const esAdmin = await BuscarAdmin(username, password)
            if (!esAdmin) {
                await token(username, password)
                setAlert({show: true, message: '¡Bienvenido cliente!'})
               setTimeout(() => {
                Navigate('/visualizacion/promociones')
               }, 2000);
                

            }else{
                await token(username, password)
                 setAlert({show: true, message: '¡Bienvenido Administrador!'})
                    setTimeout(() => {
                    Navigate("/principal")
                }, 2000);
                
                
            }
         
        } catch (error) {
            console.log('Ocurrio un error',error);
            setAlert({show: true, message: '¡No se econtro Usuario registrado!', variant: 'danger'})
            
            
            
        }
      
    }

  return (
    <div className="form-container-iniciosesion">
            <div className=' Alerta-login'>
              {alert.show && (
                  <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                    {alert.message}
                  </Alert>
                )}  
              </div>
    <h1 className="title">Iniciar Sesión</h1>
    <form className="form" onSubmit={IniciarSesion}>
        <label htmlFor="username" className="page-link-label">Nombre Usuario</label>
        <input
            id="username"
            type="text"
            value={username}
            onChange={CargarUsername}
            className="input"
        />
        <label htmlFor="password" className="page-link-label">Contraseña</label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={CargarPassword}
            className="input"
        />
        <button type="submit" className="form-btn">Iniciar Sesión</button>
    </form>
    <p className="sign-up-label">
        ¿No tienes una cuenta?{' '}
        <span className="sign-up-link" onClick={() => Navigate('/registro')}>
            Regístrate
        </span>
    </p>
</div>
 
  )
}

export default FormLogin