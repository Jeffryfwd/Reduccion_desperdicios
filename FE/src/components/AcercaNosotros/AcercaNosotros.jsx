import React from 'react'
import BotonPerfil from '../BotonPerfil/BotonPerfil'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Imagen4 from '../../img/Imagen4.jpg'

function AcercaNosotros() {
  return (
    <div>
<div className="navbar-categories">
  <ul className="categories-list">{<BotonPerfil/>}

    <li className="category-item">
      <Link to='/visualizacion/promociones'><button className="category-button">Pagina Principal</button></Link>
    </li>
    <li className="category-item">
      <Link to='/acercade'><button className="category-button">Acerca de nosotros</button></Link>
    </li>

<li className="category-item">
      <Link to='/contactenos'><button className="category-button">Contactenos</button></Link>
    </li>
    </ul>


    </div>

    <div className='acerca-nosotros'>
<img src={Imagen4} alt="" />
<p className='Texto-Acerca de nostros'>Acerca de Nosotros

En Nuestra Tienda, nos enfocamos en ofrecerte productos de alta calidad a precios accesibles, acompañados de increíbles promociones. Pensamos en tu comodidad, por eso aceptamos métodos de pago seguros y prácticos como Sinpe Móvil y PayPal.

Nuestro compromiso es brindarte la mejor experiencia de compra, siempre priorizando tus necesidades y garantizando satisfacción en cada pedido.

¡Compra fácil, ahorra más y descubre todo lo que tenemos para ti!</p>


</div>
<div className="vision-container">
  <div className="vision-content">
    <h2 className="vision-title">Nuestra Visión</h2>
    <p className="vision-text">
      En <strong>Nuestra Tienda</strong>, aspiramos a ser la primera opción para nuestros clientes, 
      ofreciendo productos de alta calidad, precios accesibles y promociones atractivas. Nos esforzamos 
      por crear una experiencia de compra cómoda, rápida y segura, adaptándonos a las necesidades de un mercado en constante evolución.
    </p>
    <p className="vision-text">
      Queremos ser reconocidos no solo por nuestros productos, sino también por nuestro compromiso con la satisfacción del cliente, 
      brindando un servicio excepcional y métodos de pago modernos como <strong>Sinpe Móvil</strong> y <strong>PayPal</strong>.
    </p>
    <p className="vision-highlight">
      ¡Nuestra misión es superar tus expectativas y convertirnos en tu aliado de confianza para tus compras diarias!
    </p>
  </div>
</div>
<div className="testimonio-container">
  <div className="testimonio-content">
    <h2 className="testimonio-title">Testimonio</h2>
    <p className="testimonio-text">
      "Desde que descubrí <strong>Esta Tienda</strong>, mis compras han sido más fáciles y accesibles. 
      Los productos siempre llegan en perfecto estado, y las promociones me permiten ahorrar mucho. 
      Además, la opción de pagar con <strong>Sinpe Móvil</strong> ha hecho todo el proceso mucho más rápido y seguro."
    </p>
    <p className="testimonio-author">- María Fernández, Cliente Satisfecha</p>
  </div>
</div>


    <div>
    <Footer/>
    </div>
    
    </div>
  )
}

export default AcercaNosotros