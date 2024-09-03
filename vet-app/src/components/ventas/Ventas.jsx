import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { Stack, Form } from 'react-bootstrap';

// Función para formatear los números como pesos chilenos
const formatCurrencyCLP = (value) => {
  return `$ ${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

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
  // Estado para manejar el filtro por fechas
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  // Estado para manejar el error de validación de fechas
  const [errorFechas, setErrorFechas] = useState(null);
  // Estado para manejar el total de ventas
  const [totalVentas, setTotalVentas] = useState(0);

  // Función para obtener las ventas desde la API
  const fetchVentas = useCallback(
    async (pagina = 1) => {
      setIsLoading(true);
      setError(null);
      setErrorFechas(null); // Reinicia el error de fechas al buscar

      // Validar si la fecha desde es mayor que la fecha hasta
      if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
        setErrorFechas('La fecha de inicio no puede ser mayor que la fecha de término.');
        setIsLoading(false);
        return;
      }

      try {
        const params = {
          page: pagina - 1,
          fechaDesde: fechaDesde ? `${fechaDesde} 00:00:00` : undefined,
          fechaHasta: fechaHasta ? `${fechaHasta} 23:59:59` : undefined,
        };

        const response = await axios.get(`${process.env.REACT_APP_API_URL}ventas/facturas`, {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          params: params, // Añadir parámetros de fechas si están definidos
        });

        setVentas(response.data.lista); // Asigna las ventas al estado
        setCantidadPaginas(response.data.cantidadPaginas); // Total de páginas para la paginación

        // Calcula el total de ventas
        const total = response.data.lista.reduce((acc, venta) => acc + venta.total, 0);
        setTotalVentas(total); // Actualiza el estado del total de ventas
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
        setError('Error al cargar las ventas. Intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [fechaDesde, fechaHasta]
  );

  // Función para obtener los detalles de una venta desde la API
  const fetchDetalleVenta = useCallback(async (ventaId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}ventas/${ventaId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
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

  // Función para manejar el cambio de fechas
  const handleFechaDesdeChange = (e) => setFechaDesde(e.target.value);
  const handleFechaHastaChange = (e) => setFechaHasta(e.target.value);

  // Función para limpiar los filtros de fecha
  const handleLimpiarFiltros = () => {
    setFechaDesde('');
    setFechaHasta('');
    setErrorFechas(null);
    setPaginaActual(1); // Reiniciar a la primera página
    fetchVentas(1); // Recargar las ventas con todos los datos
  };

  // Función para refrescar las ventas y limpiar los filtros
  const handleRefrescarVentas = () => {
    handleLimpiarFiltros(); // Llama a limpiar los filtros antes de refrescar
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
            <div>
              <h4 className="mb-3 mb-md-0">Ventas</h4>
            </div>
            <Button variant="primary" onClick={handleRefrescarVentas} disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Refrescar Ventas'}
            </Button>
          </div>

          {/* Filtro por fechas */}
          <div className="d-flex justify-content-start align-items-center mb-3">
            <Form.Group controlId="fechaDesde">
              <Form.Label>Fecha Desde:</Form.Label>
              <Form.Control type="date" value={fechaDesde} onChange={handleFechaDesdeChange} />
            </Form.Group>
            <Form.Group controlId="fechaHasta" className="ms-3">
              <Form.Label>Fecha Hasta:</Form.Label>
              <Form.Control type="date" value={fechaHasta} onChange={handleFechaHastaChange} />
            </Form.Group>
            <Button variant="secondary" className="ms-3 mt-4" onClick={handleLimpiarFiltros}>
              Limpiar Filtros
            </Button>
          </div>

          {/* Mostrar error de fechas si existe */}
          {errorFechas && <div className="alert alert-warning mt-3">{errorFechas}</div>}

          {/* Mostrar error si existe */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Mostrar total de ventas */}
          <div className="mb-3">
            <h6>Total de Ventas: {formatCurrencyCLP(totalVentas)}</h6>
          </div>

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
                          <td>{venta.fecha}</td>
                          <td>{formatCurrencyCLP(venta.total)}</td>
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
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Detalles de la Venta #{ventaSeleccionada.id}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <strong>Fecha:</strong> {ventaSeleccionada.fecha}
                </p>
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
                        <td>{formatCurrencyCLP(producto.precioUnitario)}</td>
                        <td>{formatCurrencyCLP(producto.cantidad * producto.precioUnitario)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <br />
                <Stack gap={3}>
                  <div className="p-2">
                    <p>
                      <strong>Total </strong> {formatCurrencyCLP(ventaSeleccionada.total - ventaSeleccionada.iva)}
                    </p>
                  </div>
                  <div className="p-2">
                    <p>
                      <strong>Total Iva:</strong> {formatCurrencyCLP(ventaSeleccionada.iva)}
                    </p>
                  </div>
                  <div className="p-2">
                    <p>
                      <strong>Total Venta:</strong> {formatCurrencyCLP(ventaSeleccionada.total)}
                    </p>
                  </div>
                </Stack>
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
