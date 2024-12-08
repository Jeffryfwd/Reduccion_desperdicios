import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PregistroUser from '../pages/PregistroUser';
import PLogin from '../pages/PLogin';
import PPrincipal from '../pages/PPrincipal';
import PañadirProducto from '../pages/PañadirProducto';
import Ppvencimiento from '../pages/Ppvencimiento';
import Ppromociones from '../pages/AdminVenta/Ppromociones';
import PprincipalAdminVenta from '../pages/AdminVenta/PprincipalAdminVenta';
import ProtectAdmin from '../../ProtectAdmin';
import PFile from '../pages/PFile';
import Carrito from '../components/CarritoCompras/Carrito';
import PVisualizacionPromociones from '../pages/Visualizacion_Promociones/PVisualizacionPromociones';
import PConfirmar from '../pages/Confirmar_CompraPage/PConfirmar';
import PVisualizacionVenta from '../pages/PVisualizacion-Compras/PVisualizacionVenta';

function Routing() {
  return (
    <div>
        <Router>

            <Routes>
                <Route path='/' element={<PLogin/>}></Route>
                <Route path='/Registro' element={<PregistroUser/>}></Route>
                <Route path='/Principal' element={<ProtectAdmin><PPrincipal/></ProtectAdmin>}></Route>
                <Route path='/añadir' element={<ProtectAdmin><PañadirProducto/></ProtectAdmin>}></Route>
                <Route path='/vencimiento' element={<ProtectAdmin><Ppvencimiento/></ProtectAdmin>}></Route>
                <Route path='/promociones' element={<ProtectAdmin><Ppromociones/></ProtectAdmin>}></Route>
                <Route path='/principal/adminV' element={<ProtectAdmin><PprincipalAdminVenta/></ProtectAdmin>}></Route>
                <Route path='/visualizacion/venta' element={<PVisualizacionVenta/>}></Route>
                
                <Route path='/carrito' element={<Carrito/>}></Route>
                <Route path='/visualizacion/promociones' element={<PVisualizacionPromociones/>}></Route>
                <Route path='/confirmar/compra' element={<PConfirmar/>}></Route>




                <Route path='/file' element={<PFile/>}></Route>




            </Routes>


        </Router>


    </div>
  )
}

export default Routing