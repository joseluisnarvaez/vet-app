import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const FormSelect = ({ name, value, handleFormChange, id, funcionLoad }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    let isMounted = true; // Variable para comprobar si el componente está montado

    // Llamada a la función para cargar datos
    funcionLoad(id)
      .then(res => {
        if (isMounted) {
          setData(res.lista);
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        setError('No se pudo cargar la lista.'); // Manejo de errores
      });

    // Cleanup function para evitar actualización de estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, [id, funcionLoad]);

  const handleSelectChange = (event) => {
    if (handleFormChange) {
      handleFormChange(event);
    }
  };

  return (
    <Form.Select
      name={name}
      className="form-control"
      value={value}
      onChange={handleSelectChange}
    >
      <option value="">Seleccione</option>
      {error && <option disabled>{error}</option>} {/* Mostrar error en opciones si hay */}
      {data.map((item) => (
        <option key={item.id} value={item.id}>{item.nombre}</option> 
      ))}
    </Form.Select>
  );
};

export default FormSelect;
