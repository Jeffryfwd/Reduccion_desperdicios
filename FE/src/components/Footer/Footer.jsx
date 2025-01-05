import React from 'react'
import '../../css/Footer.css'

function Footer() {
  return (
<div>
    <footer className="footer bg-dark text-white">
        <div className="container-fluid text-center py-4">
            {/* Sección de invitación */}
            <h3 className="mb-3">ÚNETE A NUESTRA CULTURA DE COMPRAS</h3>
            <p className="mb-4">
                Mantente al día con nuestras ofertas exclusivas, nuevos productos y promociones especiales.
            </p>

            {/* Formulario de suscripción */}
            <form className="d-flex justify-content-center align-items-center mb-4">
                <input
                    type="email"
                    className="form-control me-2"
                    placeholder="Ingresa tu correo electrónico"
                    style={{ maxWidth: "300px" }}
                    required
                />
                <button type="submit" className="btn btn-success">¡SUSCRÍBETE!</button>
            </form>

            {/* Redes sociales */}
            <div className="social-icons mb-4">
                <a href="#!" className="text-white me-3">
                    <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a href="#!" className="text-white me-3">
                    <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="#!" className="text-white me-3">
                    <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a href="#!" className="text-white">
                    <i className="fab fa-whatsapp fa-lg"></i>
                </a>
            </div>

            {/* Links del pie de página */}
            <div className="footer-links mb-3">
                <a href="#!" className="text-white text-decoration-none mx-2">Inicio</a>
                <a href="#!" className="text-white text-decoration-none mx-2">Tienda</a>
                <a href="#!" className="text-white text-decoration-none mx-2">Contacto</a>
                <a href="#!" className="text-white text-decoration-none mx-2">Nosotros</a>
            </div>

            {/* Información adicional */}
            <div className="footer-info">
                <p className="mb-0">
                    Tienda XYZ | Todo lo que necesitas, en un solo lugar.
                </p>
                <small className="text-muted">
                    © 2025 Tienda XYZ | Todos los derechos reservados
                </small>
            </div>
        </div>
    </footer>
</div>


  )
}

export default Footer