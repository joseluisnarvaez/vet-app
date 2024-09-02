import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios'; // Para realizar llamadas a la API

const Ventas = () => {
  // Estado para almacenar las ventas
  const [ventas, setVentas] = useState([]);
  // Estado para el detalle de una venta seleccionada
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  // Estado para manejar la carga de ventas
  const [isLoading, setIsLoading] = useState(false);
  // Estado para manejar la visibilidad del modal de detalles
  const [showModal, setShowModal] = useState(false);
  // Estado para manejar mensajes de error
  const [error, setError] = useState(null);
  // Estado para manejar la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [cantidadPaginas, setCantidadPaginas] = useState(1);

  // Función para obtener las ventas desde la API
  const fetchVentas = useCallback(async (pagina = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}ventas?page=${pagina - 1}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      setVentas(response.data.lista); // Asigna las ventas al estado
      setCantidadPaginas(response.data.cantidadPaginas); // Total de páginas para la paginación
    } catch (error) {
      console.error('Error al cargar las ventas:', error);
      setError('Error al cargar las ventas. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para obtener los detalles de una venta desde la API
  const fetchDetalleVenta = useCallback(async (ventaId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}ventas/${ventaId}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      setVentaSeleccionada(response.data.facturaForm); // Asigna los detalles de la venta al estado
      setShowModal(true); // Muestra el modal con los detalles de la venta
    } catch (error) {
      console.error('Error al cargar los detalles de la venta:', error);
      setError('Error al cargar los detalles de la venta. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto para cargar las ventas al montar el componente
  useEffect(() => {
    fetchVentas(paginaActual); // Llama a fetchVentas con la página actual
  }, [fetchVentas, paginaActual]);

  // Función para manejar la selección de una venta y mostrar sus detalles
  const handleVerDetalle = (ventaId) => {
    fetchDetalleVenta(ventaId); // Llama a fetchDetalleVenta para obtener los detalles
  };

  // Función para cerrar el modal de detalles
  const handleCloseModal = () => {
    setShowModal(false);
    setVentaSeleccionada(null);
  };

  // Función para manejar los clics de paginación
  const handlePaginaClick = (pagina) => {
    if (pagina !== paginaActual) {
      setPaginaActual(pagina);
    }
  };

  const paginaAnterior = paginaActual > 1 ? paginaActual - 1 : 1;
  const paginaSiguiente = paginaActual < cantidadPaginas ? paginaActual + 1 : cantidadPaginas;

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
            <div>
              <h4 className="mb-3 mb-md-0">Ventas</h4>
            </div>
            <Button variant="primary" onClick={() => fetchVentas(paginaActual)} disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Refrescar Ventas'}
            </Button>
          </div>

          {/* Mostrar error si existe */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Tabla de ventas */}
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Lista de Ventas</h6>
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID Venta</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas.map((venta) => (
                        <tr key={venta.id}>
                          <td>{venta.id}</td>
                          <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                          <td>${venta.total.toFixed(2)}</td>
                          <td>
                            <Button variant="primary" onClick={() => handleVerDetalle(venta.id)}>
                              Ver Detalle
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Paginación */}
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

          {/* Modal para mostrar detalles de una venta */}
          {ventaSeleccionada && (
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Detalles de la Venta #{ventaSeleccionada.id}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Fecha:</strong> {ventaSeleccionada.fecha}</p>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventaSeleccionada.items.map((producto) => (
                      <tr key={producto.idProducto}>
                        <td>{producto.glosaProducto}</td>
                        <td>{producto.cantidad}</td>
                        <td>${producto.precioUnitario.toFixed(2)}</td>
                        <td>${(producto.cantidad * producto.precioUnitario).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p><strong>Total Venta:</strong> ${ventaSeleccionada.total.toFixed(2)}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ventas;
