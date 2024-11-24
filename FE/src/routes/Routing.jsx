import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PregistroUser from '../pages/PregistroUser';
import PLogin from '../pages/PLogin';
import PPrincipal from '../pages/PPrincipal';
import PañadirProducto from '../pages/PañadirProducto';

function Routing() {
  return (
    <div>
        <Router>

            <Routes>
                <Route path='/' element={<PLogin/>}></Route>
                <Route path='/Registro' element={<PregistroUser/>}></Route>
                <Route path='/Principal' element={<PPrincipal/>}></Route>
                <Route path='/añadir' element={<PañadirProducto/>}></Route>


            </Routes>


        </Router>


    </div>
  )
}

export default Routing