import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';


const FormSelect = ({ name, value, handleFormChange , id, funcionLoad }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
         funcionLoad(id).then(res => {
            console.log(res);
            setData(res.data.lista);
        }
        )
        .catch(function (error) {
          console.log(error);
        }
        );
         
    }, [id]);

    const handleSelectChange = (event) => {
        // Llama a la función de manejo del formulario si está definida
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
            <option value="option1">Seleccione</option>
            {data.map((item, index) => (
                <option key={index} value={item.id}>{item.nombre}</option>
            ))}

        </Form.Select>
    );
};

export default FormSelect;
