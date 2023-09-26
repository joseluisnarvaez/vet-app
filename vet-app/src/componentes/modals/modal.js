import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const ModalComponente = ({ formulario }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({}); // Estado para almacenar el JSON del formulario
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setvariant] = useState('');
    const [mensajeAlert, setMensajeAlert] = useState('');
    
    const handleClose = () => {
        setShow(false);
    };

    const sendPost = () => {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };
        console.log("Cerrando y enviando el formulario JSON:", formData);

        // Realizar la solicitud POST a la URL
        axios.post(formulario.url, formData, { headers })
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                setvariant('success') ;
                setMensajeAlert('Se guardo correctamente');
                formulario.updateTabla(0);
                setShow(false);
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                setvariant('danger') ;
                setMensajeAlert( 'Error al guardar');
                
            });

            setShowAlert(true);
        
    };

    const handleShow = () => {
        // Limpiar el formulario estableciendo formData a un objeto vacío
        setFormData({});
        setShow(true);
    };

    // Función para manejar cambios en los campos del formulario y actualizar el estado formData
    const handleFormChange = (event, index) => {
        const { id, value } = event.target;
        const updatedFormData = { ...formData };
        updatedFormData[id] = value;
        setFormData(updatedFormData);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {formulario.nameButton}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formulario.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {formulario.formulario.map((form, index) => (
                            <Form.Group className="mb-3" controlId={form.name} key={index}>
                                <Form.Label>{form.label}</Form.Label>
                                {form.type === 'textarea' ? (
                                    <Form.Control
                                        as="textarea"
                                        rows={3}

                                        name={form.name}
                                        placeholder={form.placeholder}
                                        value={formData[form.name] || ''} // Usar el valor del estado formData
                                        onChange={(event) => handleFormChange(event, index)} // Manejar cambios en el campo
                                    />
                                ) : (
                                    <Form.Control
                                        type={form.type}
                                        name={form.name}
                                        placeholder={form.placeholder}
                                        value={formData[form.name] || ''} // Usar el valor del estado formData
                                        onChange={(event) => handleFormChange(event, index)} // Manejar cambios en el campo
                                    />
                                )}
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={sendPost}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
            <Alert show={showAlert} variant={variant} >
                <Alert.Heading>My Alert</Alert.Heading>
                <p>
                    {mensajeAlert}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowAlert(false)} variant="outline-success">
                        Close me
                    </Button>
                </div>
            </Alert>
        </>
    );
};

export default ModalComponente;
