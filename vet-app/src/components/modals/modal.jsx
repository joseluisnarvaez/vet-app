import React, { useState, useEffect  } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AlertaComponente from '../alertas/alerta';
import  FormSelect from '../FormComponent/FormSelect';


const ModalComponente = ({ editar, formulario, onClose }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({}); // Estado para almacenar el JSON del formulario
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [alertaVariante, setAlertaVariante] = useState('success');
    const [alertaMensaje, setAlertaMensaje] = useState('');
    

    const handleClose = () => {
        setShow(false);
        onClose();
    
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

const handleShow = (editMode = false) => {
    const initialFormData = formulario.formulario.reduce((acc, field) => {
        acc[field.value] = field.value;
        return acc;
    }, {});
    setFormData(initialFormData);
    setShow(true);
};
    
    // Función para manejar cambios en los campos del formulario y actualizar el estado formData
    const handleFormChange = (event) => {
        if (event.target.name === 'id') {
            return;
        }
        const { id, name } = event.target;
        const nombre = name !== '' ? name : id ;
    
        // Usamos una función de devolución de llamada con setFormData para asegurarnos de que
        // el estado se haya actualizado antes de imprimirlo en la consola
        setFormData(prevFormData => {
            const updatedFormData = {
                ...prevFormData,
                [nombre]: event.target.value,
            };
            console.log(updatedFormData); // Imprimimos el estado actualizado
            return updatedFormData; // Devolvemos el estado actualizado
        });
    };
    

    const apagarAlerta = () => {
        
        const timeoutId = setTimeout(() => {
            setMostrarAlerta(false);
        },  5000);
    
        return () => {
          clearTimeout(timeoutId);
        };
    }
    useEffect(() => {
            if(!editar) return;
            const initialFormData = formulario.formulario.reduce((acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {});
            setFormData(initialFormData);
            setShow(true);
        
    }, [formulario,editar]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {formulario.nameButton }
            </Button>

            <Modal show={show} onHide={handleClose}  backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{!editar?
                    formulario.title:
                    formulario.titleEditar }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {mostrarAlerta && <AlertaComponente variant={alertaVariante} mensajeAlert={alertaMensaje} mostrarAlerta={mostrarAlerta} />}
                    <Form className={formulario.formulario.length > 5 ? 'col' : ''}>
                        {console.log(formulario)}
                        {
                            
                        formulario.formulario.map((form, index) => (
                            <Form.Group className={`mb-3 ${formulario.formulario.length > 5 ? 'row' : ''}`} controlId={form.name} key={index}>
                                <Form.Label>{form.label}</Form.Label>
                                {form.type === 'textarea' && (
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name={form.name}
                                        className="form-control"
                                        placeholder={form.placeholder}
                                        value={formData[form.name] || ''}
                                        onChange={handleFormChange}
                                    />
                                )}
                                {(form.type === 'text' || form.type === 'hidden' || form.type === 'number') && (
                                    <Form.Control
                                        type={form.type}
                                        name={form.name}
                                        className="form-control"
                                        placeholder={form.placeholder}
                                        value={formData[form.name] || ''}
                                        onChange={handleFormChange}
                                    />
                                )}
                                {form.type === 'select' && (
                                    <FormSelect {...form.name} value={formData[form.name] || ''}  handleFormChange = {handleFormChange} id= {128} funcionLoad = {form.loadValues} />
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
