import { React, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AlertaComponente from '../alertas/alerta';

const Tabla = ({ data, paginaActual, cantidadPaginas, cantidadPorPagina, funCambioPagina, funEliminar, url }) => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [alertaVariante, setAlertaVariante] = useState('success');
  const [alertaMensaje, setAlertaMensaje] = useState('');

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  const headers = Object.keys(data[0]);
  paginaActual++;

  // Calcula la página anterior y siguiente
  const paginaAnterior = paginaActual > 1 ? paginaActual - 1 : 1;
  const paginaSiguiente = paginaActual < cantidadPaginas ? paginaActual + 1 : cantidadPaginas;
  const datosPaginados = data;

  const handlePaginaClick = (pagina) => {
    funCambioPagina(pagina);
    console.log(`Cambiando a la página ${pagina}`);
  };

  const handleEditarClick = () => {
    // Lógica para manejar el clic en "Editar"
    console.log('Editar clicado');
  };

  const handleEliminarClick = async (id, url) => {
    const eliminado = await funEliminar(id, url);
    funCambioPagina(0);
    if (eliminado) {
      setAlertaVariante('success');
      setAlertaMensaje('Eliminado con éxito');
      setMostrarAlerta(true);
    }
    else {
      setAlertaVariante('danger');
      setAlertaMensaje('Error al eliminar');
      setMostrarAlerta(true);
    }
  };

  return (
    <>
 
     {mostrarAlerta && <AlertaComponente variant={alertaVariante} mensajeAlert={alertaMensaje} />}
      <Table responsive="xl" striped="columns">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datosPaginados.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, headerIndex) => (
                <td key={headerIndex}>{row[header]}</td>
              ))}
              <td>
                <DropdownButton id="dropdown-basic-button" title="Acción">
                  <Dropdown.Item onClick={() => handleEditarClick}>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEliminarClick(row['id'], url)}>Eliminar</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => handlePaginaClick(1)} />
        <Pagination.Prev onClick={() => handlePaginaClick(paginaAnterior)} />
        {Array.from({ length: cantidadPaginas }, (_, index) => (
          <Pagination.Item
            key={index}
            active={paginaActual === index + 1}
            onClick={() => handlePaginaClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePaginaClick(paginaSiguiente)} />
        <Pagination.Last onClick={() => handlePaginaClick(cantidadPaginas)} />
      </Pagination>
      
    </>
  );
};

export default Tabla;
