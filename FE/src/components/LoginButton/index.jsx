import React, { useState } from 'react'
import token from '../../services/token'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'


function LoginButton() {
const [username, setUsername]= useState("")
const [password, setPassword]= useState("")
const [alert, setAlert]= useState({show: false, message: '', variant: ''})


const CargarUsername=(e)=>{
  setUsername(e.target.value)
}
const CargarPassword=(e)=>{
  setPassword(e.target.value)
}

const IniciarSesion=async(e)=>{
  e.preventDefault()
  try {
    await token(username, password)
    setAlert({show: true, message: 'Bienvenido Cliente'})
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    
  }

}

  return (
    <div class="dropdown">
    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
      Ingreso
    </button>
    <div className=' Alerta-login'>
          {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                {alert.message}
              </Alert>
            )}  
          </div>
    <form className="dropdown-menu" onSubmit={IniciarSesion}>
      <div className="mb-3">
        <label for="exampleDropdownFormEmail2" className="form-label">Nombre Usuario</label>
        <input type="text" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" 
        value={username}
        onChange={CargarUsername}/>
      </div>
      <div class="mb-3">
        <label for="exampleDropdownFormPassword2" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"
        value={password}
        onChange={CargarPassword}/>
      </div>
      <div className="mb-3">
      <p>Si no tienes cuenta registrate<Link to='/registro'>Aqui</Link></p>
      </div>
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
  </div>
  )
}

export default LoginButton