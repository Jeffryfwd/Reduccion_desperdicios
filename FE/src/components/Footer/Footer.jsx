import React from 'react'
import '../../css/Footer.css'

function Footer() {
  return (
<div>
  <hr />
<div className="row gx-5 row-cols-2 row-cols-lg-4 py-5" id='Conter-footer'>
            <div className="col">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-chat-dots"></i>
              </div>
              <div className="h5 mb-2" id='Content-map'> 
             
            <iframe
                src="https://maps.google.com/maps?q=fwd%20Costa%20Rica&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" 
                width="200"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
             ></iframe>
             <div><h1 className='ubicacion'>NUESTRA UBICACIÓN</h1></div></div>
             
            </div>
            <div className="col">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-people"></i>
              </div>
              <div className="h5">Pregúntele a la comunidad</div>
              <p  id='Text-footer'>Explora nuestros foros comunitarios y comunícate con otros usuarios.</p>
            </div>
            <div className="col">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-question-circle"></i>
              </div>
              <div className="h5">Centro de soporte</div>
              <p  id='Text-footer'>Explore las preguntas frecuentes y los artículos de soporte para encontrar soluciones.</p>
            </div>
            <div className="col">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-telephone"></i>
              </div>
              <div className="h5">Llamanos</div>
              <p className="" id='Text-footer'>Llámenos durante el horario comercial normal al (506) 8879-4797.</p>
              <p className="" id='Text-footer'>Estamos ubicados en</p>
             

            </div>
          </div>
</div>


  )
}

export default Footer