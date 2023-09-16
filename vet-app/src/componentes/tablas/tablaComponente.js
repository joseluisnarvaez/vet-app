import React from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

const Tabla = ({ data, paginaActual, cantidadPaginas, cantidadPorPagina , funCambioPagina} ) => {
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  const headers = Object.keys(data[0]);
  paginaActual++;
  // Calcula la página anterior y siguiente
  const paginaAnterior = paginaActual > 1 ? paginaActual - 1 : 1;
  const paginaSiguiente = paginaActual < cantidadPaginas ? paginaActual + 1 : cantidadPaginas;

  // Calcula los índices para mostrar los datos de la página actual
  const startIndex = (paginaActual - 1) * cantidadPorPagina;
  const endIndex = Math.min(startIndex + cantidadPorPagina, data.length);

  // Filtra los datos para mostrar solo los de la página actual
  const datosPaginados = data;

  const handlePaginaClick = (pagina) => {
    funCambioPagina(pagina);
    console.log(`Cambiando a la página ${pagina}`);
  };

  return (
    <>
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
