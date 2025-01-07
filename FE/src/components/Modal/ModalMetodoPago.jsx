import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UploadFile } from '../../Firebase/config';
import { Alert } from 'react-bootstrap'


function ModalMetodoPago() {
    
    const [comprobante, setComprobante] = useState(null);
    const [comprobanteUrl, setComprobanteUrl] = useState("");
    const [alert, setAlert]= useState({show: false, message: '', variant: ''})
    const [show, setShow] = useState(false);
    

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
            mostrarAlerta('Adjuntado con exito')
            localStorage.setItem('Comprobante', resultado); // Guardar en localStorage
           handleClose(); // Cerrar el modal después de guardar
        } else {
        return  mostrarAlerta('Por favor adjunta el comprobante', 'warning');
            
        }
    };
    const mostrarAlerta = (mensaje, tipo) => {
        setAlert({ show: true, message: mensaje, variant: tipo });
        setTimeout(() => {
            setAlert({ show: false, message: '', variant: '' }); // Ocultar la alerta después de 2 segundos
        }, 2000);
    };

    return (
        <>
            <label htmlFor="">Sinpe Movil</label>
            <input type='checkbox' variant="primary" onClick={handleShow} />
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='modal-header3'>
                <div className=' Alerta-login'>
              {alert.show && (
                  <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                    {alert.message}
                  </Alert>
                )}  
              </div>
                    <Modal.Title className='modal-title-login'>Método de pago</Modal.Title>
                </Modal.Header >
                <Modal.Body>
                    Adjunta el comprobante
                    <form onSubmit={subirComprobante}>
                        <input type="file" onChange={cargarImagen} />
                        <Modal.Footer>
                            <Button variant="primary" type='submit' className="btn-login3">
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