import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AlertaComponente from '../alertas/alerta';
import FormSelect from '../FormComponent/FormSelect';
import { Col, Row } from 'react-bootstrap';

const ModalComponente = ({ editar, formulario, onClose }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({}); // Estado para almacenar el JSON del formulario
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [alertaVariante, setAlertaVariante] = useState('success');
  const [alertaMensaje, setAlertaMensaje] = useState('');
  const filas = Math.ceil(formulario.formulario.length / 2);

  // Función de manejo de cierre del modal
  const handleClose = () => {
    setShow(false);
    setFormData({}); // Limpia los datos del formulario
    onClose();
  };

  // Función para manejar cambios en los campos del formulario y actualizar el estado formData
  const handleFormChange = (event) => {
    const { id, name, value } = event.target;
    const fieldName = name || id; // Usa el nombre o el id como clave

    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: value
    }));
  };

  // Función para enviar los datos del formulario
  const sendPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': token,
        'Content-Type': 'application/json'
      };

      console.log("Cerrando y enviando el formulario JSON:", formData);

      const response = await axios.post(formulario.url, formData, { headers });

      console.log('Respuesta del servidor:', response.data);
      setAlertaVariante('success');
      setAlertaMensaje('Guardado con éxito');
      setMostrarAlerta(true);

      formulario.updateTabla(0);

      // Cierra el modal inmediatamente después del éxito
      handleClose();

    } catch (error) {
      if (error.response && error.response.data) {
        const errores = error.response.data;
        const mensajeError = Object.values(errores).join(', ');
        setAlertaMensaje(`Error al guardar: ${mensajeError}`);
      } else {
        setAlertaMensaje('Error al guardar');
      }

      setAlertaVariante('danger');
      setMostrarAlerta(true);
    }
    apagarAlerta();
  };

  // Función para apagar la alerta después de un tiempo
  const apagarAlerta = () => {
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000);
  };

  // Función para inicializar los datos del formulario
  const initializeFormData = useCallback(() => {
    const initialFormData = formulario.formulario.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
    setFormData(initialFormData);
  }, [formulario]);

  // useEffect para manejar la inicialización del formulario y la apertura del modal en modo edición
  useEffect(() => {
    if (editar) {
      initializeFormData();
      setShow(true);
    }
  }, [editar, initializeFormData]);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {formulario.nameButton}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" size={formulario.formulario.length > 5 ? 'lg' : ''}>
        <Modal.Header closeButton>
          <Modal.Title>{!editar ? formulario.title : formulario.titleEditar}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mostrarAlerta && <AlertaComponente variant={alertaVariante} mensajeAlert={alertaMensaje} mostrarAlerta={mostrarAlerta} />}
          <Form>
            {Array.from({ length: filas }, (_, rowIndex) => (
              <Row key={rowIndex}>
                {formulario.formulario.slice(rowIndex * 2, (rowIndex + 1) * 2).map((form, colIndex) => (
                  <Col key={colIndex}>
                    <Form.Group controlId={form.name}>
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
                        <FormSelect
                          name={form.name}
                          value={formData[form.name] || ''}
                          handleFormChange={handleFormChange}
                          id={128}
                          funcionLoad={form.loadValues}
                        />
                      )}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
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
