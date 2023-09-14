import React, { useState, useEffect } from 'react';
import Tabla from '../tablas/tablaComponente';
import axios from 'axios';

const options = [

  {
    name: 'Disable backdrop',
    scroll: false,
    backdrop: false,
  },
];
const App = () => {

  const [categoriaData, setCategoriaData] = useState([]); // Estado para almacenar los datos de la categoría
  const headers = {
    'Authorization': localStorage.getItem('token')
  };

  useEffect(() => {
    // Realizar la solicitud GET cuando el componente se monte
    axios.get('http://localhost:8080/categoria/listar', { headers })
      .then(function (response) {
        // Actualizar el estado con los datos de la categoría cuando la solicitud se complete
        setCategoriaData(response.data.listaCategorias);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez al montar el componente

  return (
    
      <>  
         <Tabla data={categoriaData}></Tabla>

    </>

  );
};

export default App;
