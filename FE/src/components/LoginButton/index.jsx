import React, { useState } from 'react'
import token from '../../services/token'
import { Link } from 'react-router-dom'
import { Modal, Button, Alert } from 'react-bootstrap'

function LoginButton() {
const [username, setUsername]= useState("")
const [password, setPassword]= useState("")
const [alert, setAlert]= useState({show: false, message: '', variant: ''})
const [showModal, setShowModal] = useState(false);

const handleClose = () => setShowModal(false);
const handleShow = () => setShowModal(true);

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
    setAlert({show: true, message: 'Bienvenido Cliente', variant: 'success'})
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    setAlert({show: true, message: 'Error al iniciar sesión', variant: 'danger'})
  }
}

  return (
    <div className="login-container">
      <Button variant="primary" onClick={handleShow} className="btn-login33">
        Ingreso
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header className='modal-header3' closeButton >
          <Modal.Title className="modal-title-login">Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='alert-container-login'>
            {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                {alert.message}
              </Alert>
            )}  
          </div>
          <form className="form-login" onSubmit={IniciarSesion}>
            <div className="mb-3-login">
              <label htmlFor="exampleModalFormEmail2" className="form-label-login">Nombre Usuario</label>
              <input 
                type="text" 
                className="form-control-login" 
                id="exampleModalFormEmail2" 
                placeholder="email@example.com" 
                value={username} 
                onChange={CargarUsername}
              />
            </div>
            <div className="mb-3-login">
              <label htmlFor="exampleModalFormPassword2" className="form-label-login">Contraseña</label>
              <input 
                type="password" 
                className="form-control-login" 
                id="exampleModalFormPassword2" 
                placeholder="Password"
                value={password}
                onChange={CargarPassword}
              />
            </div>

            <div className="mb-3-login">
              <p>Si no tienes cuenta registrate <Link to='/registro'>Aqui</Link></p>
            </div>
            <Button variant="primary" type="submit" className="btn-login3">
              Sign in
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default LoginButton
