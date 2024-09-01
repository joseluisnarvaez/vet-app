import { useState, useCallback } from "react";
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
  const [currentId, setCurrentId] = useState(null); // Estado para rastrear el ID del registro actual

  // Mueve los hooks useCallback fuera de cualquier condicional
  const handleEditarClick = useCallback(async (id) => {
    try {
      await funCargaEditar(id, url);
      setCurrentId(id); // Establece el ID actual del registro que se está editando
      setEditar(true);  // Abre el modal
    } catch (error) {
      console.error("Error cargando datos para editar:", error);
      setAlertaMensaje('Error al cargar los datos para editar.');
      setAlertaVariante('danger');
      setMostrarAlerta(true);
      apagarAlerta();
    }
  }, [funCargaEditar, url]); // Asegúrate de incluir las dependencias correctas

  const handleClose = useCallback(() => {
    setEditar(false);
    setCurrentId(null); // Limpia el ID actual cuando se cierra el modal
  }, []);

  const handleEliminarClick = async (id) => {
    try {
      const eliminado = await funEliminar(id, url);
      funCambioPagina(0);
      setAlertaVariante(eliminado ? "success" : "danger");
      setAlertaMensaje(eliminado ? "Eliminado con éxito" : "Error al eliminar");
      setMostrarAlerta(true);
      apagarAlerta();
    } catch (error) {
      console.error("Error eliminando el registro:", error);
      setAlertaMensaje('Error al eliminar el registro.');
      setAlertaVariante('danger');
      setMostrarAlerta(true);
      apagarAlerta();
    }
  };

  const apagarAlerta = () => {
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000);
  };

  // Verifica si hay datos después de inicializar todos los hooks
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  const headers = Object.keys(data[0]);
  const paginaAnterior = paginaActual > 1 ? paginaActual - 1 : 1;
  const paginaSiguiente = paginaActual < cantidadPaginas ? paginaActual + 1 : cantidadPaginas;

  const handlePaginaClick = (pagina) => {
    if (pagina !== paginaActual) {
      funCambioPagina(pagina);
      console.log(`Cambiando a la página ${pagina}`);
    }
  };

  return (
    <>
      {/* Modal recibe props para controlar el estado de apertura y cierre */}
      <Modal 
        editar={editar} 
        formulario={formularioProps} 
        onClose={handleClose} 
        currentId={currentId} // Pasar ID actual para que Modal sepa cuál registro se está editando
      />

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
            {headers.map((header) => (
              <th key={header}>{header}</th> /* {Usar 'header' como clave única }*/
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}> {/* Usar 'row.id' como clave única */}
              {headers.map((header) => (
                <td key={`${row.id}-${header}`}>{row[header]}</td>
              ))}
              <td>
                <DropdownButton id="dropdown-basic-button" title="Acción">
                  <Dropdown.Item onClick={() => handleEditarClick(row.id)}>
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEliminarClick(row.id)}>
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
