import React from 'react'
import { useState } from 'react'
import token from '../services/token'
import GetUsuario2 from '../services/GetUsuario'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'

function FormLogin() {
    const[username, setUsername]= useState("")
    const[password, setPassword]= useState("")
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
            if (username === '' || password==='') {
               return alert('Rellene todos lo espacios')
            }

            const esAdmin = await BuscarAdmin(username, password)
            if (!esAdmin) {
                
                await token(username, password)
               Navigate('/visualizacion/promociones')
               return alert('bienvenido cliente')
            }else{
                await token(username, password)
                Navigate("/principal")
                alert('Bienvenido')
            }
         
        } catch (error) {
            console.log('Ocurrio un error',error);
            alert(error)
            
            
        }
      
    }

  return (
    <div className="form-container">
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