import React, { useState, useEffect } from 'react';
import Tabla from '../tablas/tablaComponente';
import axios from 'axios';
import Menu from '../template/menu';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from  '../modals/modal'
import { formularioCategoria, formularioSubCategoria , formularioProducto} from '../configuracion/formularios';

const App = () => {
  const [categoriaData, setCategoriaData] = useState({});
  const [SubCategoriaData, setSubCategoriaData] = useState({});
  const [activeTab, setActiveTab] = useState('Categoria'); // Estado para rastrear la pestaña activa
  const [productosData, setProductosData] = useState({}); 
  const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  };
  


  const funCambioPaginaCategoria = (pagina) => {
    pagina = pagina-1;
    console.log(pagina);
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
    pagina = pagina-1;
    console.log(pagina);
    const url = `http://localhost:8080/productos/listar?page=${pagina}`;
    console.log(url);
    axios.get(url, { headers })
      .then(function (response) {
        setProductosData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const funCambioPaginaSubCategoria = (pagina) => {
    pagina = pagina-1;
    console.log(pagina);
    axios.get(`http://localhost:8080/subcategorias/listar?page=${pagina}`, { headers })
    .then(function (response) {
      setSubCategoriaData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  async function eliminarElemento(apiUrl, headers) {
    let eliminado = false;
  
    try {
      const response = await axios.delete(apiUrl, { headers });
      eliminado = true;
      console.log('Elemento eliminado con éxito');
    } catch (error) {
      eliminado = false;
      console.error('Error al eliminar el elemento:', error);
    }
  
    return eliminado;
  }

  const funEliminar= async (id, url) => {
    const apiUrl = url +'/'+ id;
    let eliminado = false;
    eliminado = await eliminarElemento(apiUrl, headers);
    return eliminado;

  };

  formularioCategoria.url= 'http://localhost:8080/categoria';
  formularioCategoria.updateTabla = (pagina) => {  funCambioPaginaCategoria(0);};
  formularioSubCategoria.updateTabla = (pagina) => {  funCambioPaginaSubCategoria(0);};
  formularioSubCategoria.url= 'http://localhost:8080/subcategorias';
  formularioProducto.updateTabla = (pagina) => {  funCambioPaginaProducto(0);};
  formularioProducto.url= 'http://localhost:8080/productos';  

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
          <Modal formulario = {formularioCategoria} />
          {activeTab === 'Categoria' && <Tabla data={categoriaData.listaCategorias} {...categoriaData}  funCambioPagina = {funCambioPaginaCategoria} funEliminar={funEliminar} url={formularioCategoria.url} />}
        </Tab>
        <Tab eventKey="SubCategoria" title="SubCategoria">
        <Modal formulario =  {formularioSubCategoria} />
          {activeTab === 'SubCategoria' && <Tabla data={SubCategoriaData.listaSubCategorias} {...SubCategoriaData} funCambioPagina = {funCambioPaginaSubCategoria} funEliminar={funEliminar} url={formularioSubCategoria.url}/>}
        </Tab>
        <Tab eventKey="Productos" title="Productos">
        
          <Modal formulario =  {formularioProducto} />
          {activeTab === 'Productos' && <Tabla data={productosData.listaProductos} {...productosData}   funCambioPagina = {funCambioPaginaProducto} funEliminar={funEliminar} url={formularioProducto.url}/>}
        </Tab>
      </Tabs>
      
    </>
  );
};

export default App;
