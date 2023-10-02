import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AlertaComponente from '../alertas/alerta';

const ModalComponente = ({ formulario }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({}); // Estado para almacenar el JSON del formulario
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [alertaVariante, setAlertaVariante] = useState('success');
    const [alertaMensaje, setAlertaMensaje] = useState('');
    
    const handleClose = () => {
        setShow(false);
    };

    const sendPost = async () => {
        try {
          // Obtener el token del localStorage
          const token = localStorage.getItem('token');
          const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
          };
          
          console.log("Cerrando y enviando el formulario JSON:", formData);
          
          // Realizar la solicitud POST a la URL de forma asíncrona utilizando async/await
          const response = await axios.post(formulario.url, formData, { headers });
          
            console.log('Respuesta del servidor:', response.data);
            setAlertaVariante('success');
            setAlertaMensaje('Guardado con éxito');
            setMostrarAlerta(true);

          formulario.updateTabla(0);
          const timeoutId = setTimeout(() => {
            setShow(false);
            },  5000);
    
            return () => {
            clearTimeout(timeoutId);
            };
          
        } catch (error) {
             // Verificar si la respuesta contiene errores específicos
            if (error.response && error.response.data) {
                const errores = error.response.data;
                const mensajeError = Object.values(errores).join(', '); // Concatenar mensajes de error
                setAlertaMensaje(`Error al guardar: ${mensajeError}`);
            } else {
                setAlertaMensaje('Error al guardar');
            }
            
            setAlertaVariante('danger');
            setMostrarAlerta(true);
        }
        apagarAlerta()
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

    const apagarAlerta = () => {
        
        const timeoutId = setTimeout(() => {
            setMostrarAlerta(false);
        },  5000);
    
        return () => {
          clearTimeout(timeoutId);
        };
    }


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
                  {mostrarAlerta && <AlertaComponente variant={alertaVariante} mensajeAlert={alertaMensaje} mostrarAlerta={mostrarAlerta} />}
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
        </>
    );
};

export default ModalComponente;
