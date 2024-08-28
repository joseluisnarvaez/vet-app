import { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AlertaComponente from "../alertas/alerta";
import Modal from "../modals/modal";

const Tabla = ({
  data,
  paginaActual,
  cantidadPaginas,
  cantidadPorPagina,
  funCambioPagina,
  funEliminar,
  funCargaEditar,
  url,
  formularioProps,
}) => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [alertaVariante, setAlertaVariante] = useState("success");
  const [alertaMensaje, setAlertaMensaje] = useState("");
  const [editar, setEditar] = useState(false);
  const [formulario, setFormulario] = useState(null);

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }
  
  const headers = Object.keys(data[0]);
  const paginaAnterior = paginaActual > 1 ? paginaActual - 1 : 1;
  const paginaSiguiente = paginaActual < cantidadPaginas ? paginaActual + 1 : cantidadPaginas;

  const handlePaginaClick = (pagina) => {
    funCambioPagina(pagina);
    console.log(`Cambiando a la página ${pagina}`);
  };

  const handleEditarClick = async (id) => {
    const formulario = await funCargaEditar(id, url);
    setFormulario(formulario);
    setEditar(true);
  };

  const handleClose = () => {
    setEditar(false);
  };

  const handleEliminarClick = async (id) => {
    const eliminado = await funEliminar(id, url);
    funCambioPagina(0);
    setAlertaVariante(eliminado ? "success" : "danger");
    setAlertaMensaje(eliminado ? "Eliminado con éxito" : "Error al eliminar");
    setMostrarAlerta(true);
    apagarAlerta();
  };

  const apagarAlerta = () => {
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000);
  };

  return (
    <>
      <Modal editar={editar} formulario={formulario} onClose={handleClose} />

      {mostrarAlerta && (
        <AlertaComponente
          variant={alertaVariante}
          mensajeAlert={alertaMensaje}
          mostrarAlerta={mostrarAlerta}
        />
      )}
      
      <Table responsive="xl" striped="columns" title="Datos" className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, headerIndex) => (
                <td key={headerIndex}>{row[header]}</td>
              ))}
              <td>
                <DropdownButton id="dropdown-basic-button" title="Acción">
                  <Dropdown.Item onClick={() => handleEditarClick(row["id"])}>
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEliminarClick(row["id"])}>
                    Eliminar
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br />
      
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
