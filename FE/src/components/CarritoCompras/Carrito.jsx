import React from "react";
import '../../css/Cart.css'

const Carrito = () => {
  return (
    <div className="cart-container">
      {/* Título */}
      <h1 className="cart-title">Carrito</h1>

      <div className="cart-content">
        {/* Lista de productos */}
        <div className="cart-products">
          {/* Producto 1 */}
          <div className="cart-product">
            <img
              src="ruta-imagen-producto1"
              alt="Nike Sportswear Chill Terry"
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-title">Nike Sportswear Chill Terry</h2>
              <p className="product-description">
                Sudadera con capucha y cremallera completa de tejido French
              </p>
              <p className="product-color">Light Army/Sail</p>
              <p className="product-size">Talla S (EU 36-38)</p>
              <a href="#" className="gift-options">
                Opciones de regalo
              </a>
              <p className="product-price">
                <span className="old-price">69,99 €</span>{" "}
                <span className="discounted-price">48,99 €</span>
              </p>
            </div>
            <div className="product-actions">
              <button className="action-btn">🗑</button>
              <input type="number" min="1" defaultValue="1" className="quantity-input" />
              <button className="action-btn">❤️</button>
            </div>
          </div>

          {/* Agregar más productos similares */}
        </div>

        {/* Resumen */}
        <div className="cart-summary">
          <h2>Resumen</h2>
          <p>¿Tienes un código promocional?</p>
          <div className="summary-line">
            <span>Subtotal</span> <span>598,94 €</span>
          </div>
          <div className="summary-line">
            <span>Gastos de envío y gestión</span> <span>Gratuito</span>
          </div>
          <div className="summary-total">
            <span>Total</span> <span>598,94 €</span>
          </div>
          <button className="checkout-btn">Pasar por caja</button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
