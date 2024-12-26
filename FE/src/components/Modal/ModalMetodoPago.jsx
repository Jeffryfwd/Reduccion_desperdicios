import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UploadFile } from '../../Firebase/config';

function ModalMetodoPago() {
    const [show, setShow] = useState(false);
    const [comprobante, setComprobante] = useState(null);
    const [comprobanteUrl, setComprobanteUrl] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cargarImagen = async (e) => {
        const file = e.target.files[0];
        setComprobante(file);
    };

    const subirComprobante = async (e) => {
        e.preventDefault();
        if (comprobante) {
            const resultado = await UploadFile(comprobante);
            setComprobanteUrl(resultado); // Guardar la URL del archivo subido
            localStorage.setItem('Comprobante', resultado); // Guardar en localStorage
            handleClose(); // Cerrar el modal después de guardar
        } else {
            alert("Por favor, selecciona un comprobante.");
        }
    };

    return (
        <>
            <label htmlFor="">Sinpe Movil</label>
            <input type='checkbox' variant="primary" onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Método de pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Adjunta el comprobante
                    <form onSubmit={subirComprobante}>
                        <input type="file" onChange={cargarImagen} />
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                Guarda el comprobante
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalMetodoPago;