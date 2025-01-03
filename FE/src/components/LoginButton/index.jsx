import React, { useState } from 'react'
import token from '../../services/token'
import { Link } from 'react-router-dom'


function LoginButton() {
const [username, setUsername]= useState("")
const [password, setPassword]= useState("")


const CargarUsername=(e)=>{
  setUsername(e.target.value)
}
const CargarPassword=(e)=>{
  setPassword(e.target.value)
}

const IniciarSesion=async(e)=>{
  e.preventDefault()
  await token(username, password)
  alert('Inicio de sesion existoso')
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

  return (
    <div class="dropdown">
    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
      Ingreso
    </button>
    <form class="dropdown-menu p-4" onSubmit={IniciarSesion}>
      <div class="mb-3">
        <label for="exampleDropdownFormEmail2" class="form-label">Nombre Usuario</label>
        <input type="text" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" 
        value={username}
        onChange={CargarUsername}/>
      </div>
      <div class="mb-3">
        <label for="exampleDropdownFormPassword2" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password"
        value={password}
        onChange={CargarPassword}/>
      </div>
      <div class="mb-3">
      <p>Si no tienes cuenta registrate<Link to='/registro'><button>Aqui</button></Link></p>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
  </div>
  )
}

export default LoginButton