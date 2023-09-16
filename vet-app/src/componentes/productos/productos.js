import React, { useState, useEffect } from 'react';
import Tabla from '../tablas/tablaComponente';
import axios from 'axios';
import Menu from '../template/menu';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const App = () => {
  const [categoriaData, setCategoriaData] = useState({});
  const [SubCategoriaData, setSubCategoriaData] = useState({});
  const [activeTab, setActiveTab] = useState('Categoria'); // Estado para rastrear la pestaña activa
  const [productosData, setProductosData] = useState({}); 

  const headers = {
    'Authorization': localStorage.getItem('token')
  };

  const funCambioPaginaCategoria = (pagina) => {
    axios.get(`http://localhost:8080/categoria/listar?page=${pagina}`, { headers })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setCategoriaData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const funCambioPaginaProducto = (pagina) => {
    axios.get(`http://localhost:8080/productos/listar?page=${pagina}`, { headers })
      .then(function (response) {
        setProductosData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const funCambioPaginaSubCategoria = (pagina) => {
    axios.get(`http://localhost:8080/subcategorias/listar${pagina}`, { headers })
    .then(function (response) {
      setSubCategoriaData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  useEffect(() => {
    // Realiza la solicitud GET cuando el componente se monte
    axios.get('http://localhost:8080/categoria/listar', { headers })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCategoriaData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:8080/subcategorias/listar', { headers })
      .then(function (response) {
        setSubCategoriaData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.get('http://localhost:8080/productos/listar', { headers })
      .then(function (response) {
        setProductosData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Menu />

      <Tabs
        defaultActiveKey="Categoria"
        activeKey={activeTab} // Usa el estado activeTab para rastrear la pestaña activa
        onSelect={(tab) => setActiveTab(tab)} // Actualiza el estado cuando cambia la pestaña activa
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Categoria" title="Categoria">
          {activeTab === 'Categoria' && <Tabla data={categoriaData.listaCategorias} {...categoriaData} {...funCambioPaginaCategoria}/>}
        </Tab>
        <Tab eventKey="SubCategoria" title="SubCategoria">
          {activeTab === 'SubCategoria' && <Tabla data={SubCategoriaData.listaSubCategorias} {...categoriaData} {...funCambioPaginaSubCategoria} />}
        </Tab>
        <Tab eventKey="Productos" title="Productos">
          {activeTab === 'Productos' && <Tabla data={productosData.listaProductos} {...productosData} {...funCambioPaginaProducto} />}
        </Tab>
      </Tabs>
    </>
  );
};

export default App;
