import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PregistroUser from '../pages/PregistroUser';

function Routing() {
  return (
    <div>
        <Router>

            <Routes>

                <Route path='registro/' element={<PregistroUser/>}></Route>
            </Routes>


        </Router>


    </div>
  )
}

export default Routing