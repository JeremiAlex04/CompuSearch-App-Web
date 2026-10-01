import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Alert } from 'react-bootstrap';

const MockInfoModal = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Muestra el modal cada vez que se carga la aplicación.
        const timer = setTimeout(() => {
            // El requerimiento dice "cada vez que carga la pagina" 
            // Si molesta en cada render, se puede usar sessionStorage, pero por ahora se muestra siempre al recargar.
            const hasSeen = sessionStorage.getItem('mockModalShown');
            if (!hasSeen) {
                setShow(true);
                sessionStorage.setItem('mockModalShown', 'true');
            } else {
                 setShow(true); // Se muestra de todas formas al recargar la página (App.jsx mounts)
            }
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Acerca de esta Maqueta Web
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="warning">
                    <strong>¡Aviso!</strong> Esta aplicación es una <strong>maqueta (mock-up) funcional</strong> diseñada para representar la idea y el objetivo del proyecto original. No está conectada a un backend de producción.
                </Alert>
                <p>
                    Actualmente, todos los datos mostrados (componentes, armados de PC, tiendas) provienen de una base de datos simulada en memoria. Las operaciones como agregar al carrito o guardar un armado son funcionales, pero temporales.
                </p>
                <hr />
                <h5>Credenciales de Usuarios Existentes</h5>
                <p className="text-muted small mb-3">
                    La plataforma admite diferentes roles. Puedes probarlos utilizando los siguientes correos con <strong>cualquier contraseña</strong> (ej. <code>123456</code>).
                </p>
                
                <div className="table-responsive">
                    <Table striped bordered hover size="sm" className="mb-0 text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Rol</th>
                                <th>Nombre</th>
                                <th>Correo (Usuario)</th>
                                <th>Contraseña</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span className="badge bg-danger">ADMIN</span></td>
                                <td>Admin Prueba</td>
                                <td><code>admin@compusearch.com</code></td>
                                <td rowSpan="4" className="align-middle"><em>Cualquiera</em></td>
                            </tr>
                            <tr>
                                <td><span className="badge bg-primary">CLIENTE</span></td>
                                <td>Cliente Prueba</td>
                                <td><code>cliente@compusearch.com</code></td>
                            </tr>
                            <tr>
                                <td><span className="badge bg-success">SOPORTE</span></td>
                                <td>Soporte Técnico</td>
                                <td><code>soporte@compusearch.com</code></td>
                            </tr>
                            <tr>
                                <td><span className="badge bg-warning text-dark">VENDEDOR</span></td>
                                <td>Vendedor Wilson</td>
                                <td><code>ventas@compusearch.com</code></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Entendido, continuar a la web
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MockInfoModal;
