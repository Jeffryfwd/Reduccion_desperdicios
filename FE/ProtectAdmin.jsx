import React from 'react'
import { Navigate } from "react-router-dom";

function ProtectAdmin({children}) {

    const EstaAutenticado= localStorage.getItem('Autenticado')=== 'Admin';

    if (!EstaAutenticado) {
        return <Navigate to='/login'/>;
        
        
    }
  return children
}

export default ProtectAdmin