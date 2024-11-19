import React, { useState } from 'react'
import PostUsuarios from '../services/PostUsuario'

function RegistroUser() {
const [first_name, setPrimerNombre]= useState("")
const[last_name, setApellido]= useState("")
const [username, setNombre]= useState("")
const[email, setCorreo]= useState("")
const[password, setContraseña]= useState("")
const[is_staff, setRol]= useState("")

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
const CargarRol=(event)=>{
    setRol(event.target.value)
}

const Registrar = async (e) => {
    e.preventDefault();
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
        const Registro = await PostUsuarios(first_name, last_name, username, email, password, is_staff);
        alert("Se registró con éxito");
        console.log("Exitoso", Registro);
    } catch (error) {
        console.error("Error al registrar:", error);
    }
};


  return (
    <div>
   <form className="registro-form" onSubmit={Registrar}>
    <label className="registro-label" htmlFor="primer-nombre">Primer Nombre</label>
    <input className="registro-input" type="text" id="primer-nombre"
    value={first_name} 
    onChange={CargarPrimerNombre}/>

    <label className="registro-label" htmlFor="apellido">Apellido</label>
    <input className="registro-input" type="text" id="apellido" 
    value={last_name}
    onChange={CargarApellido}/>

    <label className="registro-label" htmlFor="nombre-usuario">Nombre Usuario</label>
    <input className="registro-input" type="text" id="nombre-usuario" 
    value={username}
    onChange={CargarNombre}/>

    <label className="registro-label" htmlFor="correo">Correo Electrónico</label>
    <input className="registro-input" type="email" id="correo" 
    value={email}
    onChange={CargarCorreo}/>

    <label className="registro-label" htmlFor="contrasena">Contraseña</label>
    <input className="registro-input" type="password" id="contrasena" 
    value={password}
    onChange={CargarContra}/>

    <label className="registro-label" htmlFor="rol">
        <input className="registro-checkbox" type="checkbox" id="rol"
        checked={is_staff}
        onChange={CargarRol} />
        Rol
    </label>

    <button className="registro-boton" type='submit'>Registrar</button>
</form>

    </div>
  )
}

export default RegistroUser