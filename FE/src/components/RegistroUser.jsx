import React, { useState } from 'react'
import PostUsuarios from '../services/PostUsuario'
//import GetUsuario2 from '../services/GetUsuarios'
import { useNavigate } from 'react-router-dom'
import '../css/Register.css'

function RegistroUser() {

const [first_name, setPrimerNombre]= useState("")
const[last_name, setApellido]= useState("")
const [username, setNombre]= useState("")
const[email, setCorreo]= useState("")
const[password, setContraseña]= useState("")
const[is_staff, setRol]= useState("")
const Navigate= useNavigate();

const CargarPrimerNombre=(event)=>{
    setPrimerNombre(event.target.value)
}

const CargarApellido=(event)=>{
    setApellido(event.target.value)
}

const CargarNombre=(event)=>{
    setNombre(event.target.value)
}

const CargarCorreo=(event)=>{
    setCorreo(event.target.value)
}
const CargarContra=(event)=>{
    setContraseña(event.target.value)
}




const Registrar = async (e) => {
    e.preventDefault();
   // const UsuarioExiste= await VerificarUsuarios(first_name, email)
    const userData = {
        first_name,
        last_name,
        username,
        email,
        password,
        is_staff,
    };
    
    console.log("Datos enviados al backend:", userData);
    try {
        if (first_name=== '' || last_name==='' || username===''|| email===''||  password=== '') {
            alert('Por favor llena todos los espacios')

        }
        // if (password>= 8) {
        //     return alert('La contraseña debe ser mayor a 8 digitos')
        // }
        // if (UsuarioExiste) {
        //     alert('Ya te has registrado anteriormente')
        // }
        const Registro = await PostUsuarios(first_name, last_name, username, email, password, is_staff);
        alert("Se registró con éxito");
        setTimeout(() => {
            Navigate("/login");
           }, 2500); 
        console.log("Exitoso", Registro);
    } catch (error) {
        console.error("Error al registrar:", error);
        
    }
};


  return (
    <div className="form-container2">
    <h1 className="title">Registro</h1>
    <form className="form" onSubmit={Registrar}>
        <label htmlFor="primer-nombre" className="page-link-label">Primer Nombre</label>
        <input 
            className="input" 
            type="text" 
            id="primer-nombre" 
            value={first_name} 
            onChange={CargarPrimerNombre}
        />

        <label htmlFor="apellido" className="page-link-label">Apellido</label>
        <input 
            className="input" 
            type="text" 
            id="apellido" 
            value={last_name} 
            onChange={CargarApellido}
        />

        <label htmlFor="nombre-usuario" className="page-link-label">Nombre Usuario</label>
        <input 
            className="input" 
            type="text" 
            id="nombre-usuario" 
            value={username} 
            onChange={CargarNombre}
        />

        <label htmlFor="correo" className="page-link-label">Correo Electrónico</label>
        <input 
            className="input" 
            type="email" 
            id="correo" 
            value={email} 
            onChange={CargarCorreo}
        />

        <label htmlFor="contrasena" className="page-link-label">Contraseña</label>
        <input 
            className="input" 
            type="password" 
            id="contrasena" 
            value={password} 
            onChange={CargarContra}
        />

        {/* 
        Si necesitas habilitar el rol, puedes descomentar este bloque 
        y ajustar el CSS si es necesario.
        <label htmlFor="rol" className="page-link-label">
            <input 
                className="input" 
                type="checkbox" 
                id="rol" 
                checked={is_staff} 
                onChange={CargarRol} 
            />
            Rol de Staff
        </label> 
        */}
     <p className="sign-up-label">
        ¿Ya tienes una cuenta?{' '}
        <span className="sign-up-link" onClick={() => Navigate('/login')}>
            Login
        </span>
    </p>
        <button className="form-btn" type="submit">Registrar</button>

    </form>
</div>

  )
}

export default RegistroUser