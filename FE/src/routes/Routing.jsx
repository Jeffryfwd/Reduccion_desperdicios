import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PregistroUser from '../pages/PregistroUser';
import PLogin from '../pages/PLogin';
import PPrincipal from '../pages/PPrincipal';

function Routing() {
  return (
    <div>
        <Router>

            <Routes>
                <Route path='/Login' element={<PLogin/>}></Route>
                <Route path='/Registro' element={<PregistroUser/>}></Route>
                <Route path='/Principal' element={<PPrincipal/>}></Route>

            </Routes>


        </Router>


    </div>
  )
}

export default Routing