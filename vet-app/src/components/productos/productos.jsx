import React, { useState, useEffect } from 'react';
import Tabla from '../tablas/tablaComponente';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {funCambioPaginaCategoria, setParametros as  setParametrosCategoria} from '../configuracion/CategoriaServices';
import { setParametros as  setParametrosSubCategoria, setParametrosMuestra} from '../configuracion/SubCategoraService';
import { setParametros as  setParametrosProductos} from '../configuracion/ProductoServices';
import {setParametros, setParametrosVista} from '../configuracion/proveedorService';
import { formularioCategoria, formularioSubCategoria , formularioProducto, formularioProveedor} from '../configuracion/formularios';
import SearchTextComponente from '../searchText/searchText';

const App = () => {
  const [categoriaData, setCategoriaData] = useState({});
  const [subCategoriaData, setSubCategoriaData] = useState({});
  const [activeTab, setActiveTab] = useState('Categoria'); // Estado para rastrear la pestaña activa
  const [productosData, setProductosData] = useState({}); 
  const [proveedorData, setProveedorData] = useState({}); 
  const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  };


  const funCambioPaginaProveedor = (pagina) => {
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
      console.log(response.data);
      eliminado = true;
      console.log('Elemento eliminado con éxito');
    } catch (error) {
      eliminado = false;
      console.error('Error al eliminar el elemento:', error);
    }
  
    return eliminado;
  }

    
  async function  funCargaEditar(apiUrl, headers)   {
    try {
      const response = await axios.get(apiUrl, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  };


  const funEliminar= async (id, url) => {
    const apiUrl = url +'/'+ id;
    let eliminado = false;
    eliminado = await eliminarElemento(apiUrl, headers);
    return eliminado;

  };

  formularioCategoria.url= 'http://localhost:8080/categoria';
  formularioCategoria.updateTabla = (pagina) => {  funCambioPaginaCategoria(0);};
  formularioCategoria.show = false;

  
  formularioSubCategoria.updateTabla = (pagina) => {  funCambioPaginaSubCategoria(0);};
  formularioSubCategoria.url= 'http://localhost:8080/subcategorias';
  formularioSubCategoria.show = false;

  formularioProducto.updateTabla = (pagina) => {  funCambioPaginaProducto(0);};
  formularioProducto.url= 'http://localhost:8080/productos';  
  formularioProducto.show = false;

  formularioProveedor.updateTabla = (pagina) => {  funCambioPaginaProveedor(0);};
  formularioProveedor.url= 'http://localhost:8080/proveedor';  
  formularioProveedor.show = false;

  const funEditarCategoria  = async (id, url) => {
    const apiUrl = url +'/'+ id;

    const data = await funCargaEditar(apiUrl, headers);
    setParametrosCategoria(data,formularioCategoria)
    formularioCategoria.url= 'http://localhost:8080/categoria';

  };
  const funEditarSubCategoria  = async (id, url) => {
    const apiUrl = url +'/'+ id;

    const data = await funCargaEditar(apiUrl, headers);
    console.log(data);
    setParametrosSubCategoria(data,formularioSubCategoria);
    formularioSubCategoria.url= 'http://localhost:8080/subcategorias';
 };

 
 const funEditarProveedor  = async (id, url) => {
  const apiUrl = url +'/'+ id;

  const data = await funCargaEditar(apiUrl, headers);
  console.log(data);
  setParametros(data,formularioProveedor)
  formularioProveedor.url= 'http://localhost:8080/proveedor';
};

 const funEditarProducto  = async (id, url) => {
  const apiUrl = url +'/'+ id;

  const data = await funCargaEditar(apiUrl, headers);
  setParametrosProductos(data,formularioProducto);
  console.log(data);

  formularioProducto.url= 'http://localhost:8080/productos';
};

  useEffect(() => {
    // Realiza la solicitud GET cuando el componente se monte
    axios.get('http://localhost:8080/categoria/listar', { headers })
      .then(function (response) {
        console.log(JSON.stringify(response.data.lista));
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
      axios.get('http://localhost:8080/proveedor/listar', { headers })
      .then(function (response) {
        setProveedorData(response.data);
      })
      .catch(function (error) {
        console.log(error); 
      });
      
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="Categoria"
        activeKey={activeTab} // Usa el estado activeTab para rastrear la pestaña activa
        onSelect={(tab) => setActiveTab(tab)} // Actualiza el estado cuando cambia la pestaña activa
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Categoria" title="Categoria">
          <div className="input-group">
            <div className="input-group-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
              <SearchTextComponente url={formularioCategoria.url} setParametros={setParametrosCategoria} formulario={formularioCategoria}  />
          </div>
          <br></br>
          {activeTab === 'Categoria' && <Tabla formularioProps= {formularioCategoria} data={categoriaData.lista} {...categoriaData}  funCambioPagina = {funCambioPaginaCategoria} funEliminar={funEliminar} url={formularioCategoria.url} funCargaEditar={funEditarCategoria} />}
        </Tab>
        <Tab eventKey="SubCategoria" title="Sub-Categorías">
          <div className="input-group">
            <div className="input-group-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
              <SearchTextComponente url={formularioSubCategoria.url} setParametros={setParametrosMuestra} formulario={formularioSubCategoria}  />
          </div>
          <br></br>
          {activeTab === 'SubCategoria' && <Tabla  formularioProps= {formularioSubCategoria}  data={subCategoriaData.lista} {...subCategoriaData} funCambioPagina = {funCambioPaginaSubCategoria} funEliminar={funEliminar} url={formularioSubCategoria.url} funCargaEditar={funEditarSubCategoria}/>}
        </Tab>
        <Tab eventKey="Productos" title="Productos">
          <div className="input-group">
            <div className="input-group-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
              <SearchTextComponente url={formularioProducto.url} setParametros={setParametrosProductos} formulario={formularioProducto}  />
          </div>
          <br></br>
          {activeTab === 'Productos' && <Tabla formularioProps= {formularioProducto}  data={productosData.listaProductos} {...productosData}   funCambioPagina = {funCambioPaginaProducto} funEliminar={funEliminar} url={formularioProducto.url} funCargaEditar={funEditarProducto}/>}
        </Tab>
        <Tab eventKey="Proveedor" title="Proveedores">
        <div className="input-group">
            <div className="input-group-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
              <SearchTextComponente url={formularioProveedor.url} setParametros={setParametrosVista} formulario={formularioProveedor}  />
          </div>
          <br></br>
          {activeTab === 'Proveedor' && <Tabla formularioProps= {formularioProveedor}  data={proveedorData.lista} {...proveedorData}   funCambioPagina = {funCambioPaginaProveedor} funEliminar={funEliminar} url={formularioProveedor.url} funCargaEditar={funEditarProveedor}/>}
        </Tab>
      </Tabs>
      
    </>
  );
};

export default App;
