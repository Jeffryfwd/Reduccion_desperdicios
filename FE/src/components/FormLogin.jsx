import React from 'react'
import { useState } from 'react'
import GetUsuarios from '../services/GetUsuarios'
import { useNavigate } from 'react-router-dom'

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

    const IniciarSesion= async(event)=>{
        event.preventDefault()
        await GetUsuarios(username, password)
        Navigate("/principal")
    }

  return (
    <div>
        <form action="" onSubmit={IniciarSesion}>
            <label htmlFor="">Nombre Usuario</label>
            <input type="text" value={username}
            onChange={CargarUsername}/>
            <label htmlFor="">Contraseña</label>
            <input type="text"
            value={password}
            onChange={CargarPassword} />

            <button type='submit'>Iniciar sesion</button>

        </form>


    </div>
  )
}

export default FormLogin