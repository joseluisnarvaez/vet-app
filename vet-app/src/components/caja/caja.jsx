import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Importamos axios para realizar llamadas a la API

const getHeaders = () => ({
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

const Caja = () => {
  // Estado para la entrada de búsqueda
  const [busqueda, setBusqueda] = useState('');
  // Estado para la lista de productos resultantes de la búsqueda
  const [productos, setProductos] = useState([]);
  // Estado para los productos agregados al carrito
  const [carrito, setCarrito] = useState([]);
  // Estado para manejar la carga de búsqueda
  const [isLoading, setIsLoading] = useState(false);
  // Estado para la fecha de la caja
  const [fechaCaja, setFechaCaja] = useState('');
  // Estado para manejar mensajes de error
  const [error, setError] = useState(null);

  // Función para obtener y formatear la fecha actual en el formato requerido
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return `${fecha.getFullYear()}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${String(fecha.getDate()).padStart(2, '0')} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}:${String(fecha.getSeconds()).padStart(2, '0')}`;
  };

  // Efecto para establecer la fecha de la caja al montar el componente
  useEffect(() => {
    setFechaCaja(obtenerFechaActual());
  }, []);

  // Maneja el cambio en la entrada de búsqueda
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  // Función para realizar la búsqueda de productos en la API
  const handleBuscarProductos = async () => {
    if (!busqueda.trim()) return; // Evita realizar la búsqueda si el input está vacío

    setIsLoading(true); // Activar el indicador de carga
    setError(null); // Reiniciar el estado de error

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}productos/searchcaja/${busqueda}`, { headers: getHeaders() });
      setProductos(response.data); // Asigna los resultados de búsqueda al estado de productos
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setError('Error al buscar productos. Intente nuevamente.'); // Muestra el mensaje de error en la interfaz
    } finally {
      setIsLoading(false); // Desactivar el indicador de carga
    }
  };

  // Función para agregar productos al carrito y limpiar la búsqueda
  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    // Limpiar la búsqueda y los resultados después de agregar al carrito
    setBusqueda('');
    setProductos([]);
  };

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(
        carrito.map((producto) =>
          producto.id === id ? { ...producto, cantidad } : producto
        )
      );
    }
  };

  // Función para calcular el subtotal
  const calcularSubtotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  // Función para calcular el IVA (19% por ejemplo)
  const calcularIVA = () => {
    return calcularSubtotal() * 0.19;
  };

  // Función para calcular el total
  const calcularTotal = () => {
    return calcularSubtotal() + calcularIVA();
  };

  // Función para limpiar todos los registros
  const handleCancelar = () => {
    setBusqueda('');  // Limpiar el input de búsqueda
    setProductos([]); // Limpiar la lista de resultados de productos
    setCarrito([]);   // Limpiar el carrito
    setError(null);   // Limpiar los errores
  };

  // Función para manejar el pago
  const handlePagar = async () => {
    if (carrito.length === 0) {
      setError('El carrito está vacío. Agrega productos antes de pagar.');
      return;
    }

    const payload = {
      fecha: obtenerFechaActual(),
      items: carrito.map((item) => ({
        idProducto: item.id,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        subtotal: item.precio * item.cantidad,
      })),
      total: calcularTotal(),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}ventas/pagar`, payload, { headers: getHeaders() });
      console.log('Respuesta del servidor:', response.data);
      alert('Pago realizado con éxito');
      handleCancelar(); // Limpiar todos los registros después de pagar
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      setError('Error al realizar el pago. Intente nuevamente.');
    }
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
            <div>
              <h4 className="mb-3 mb-md-0">Caja</h4>
            </div>
          </div>

          {/* Formulario de búsqueda */}
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body justify-content-between">
                  <h6 className="card-title">Venta de productos</h6>
                  <div className="container-fluid d-flex justify-content-between">
                    <div className="col-lg-7 ps-0">
                      <p className="text-muted mb-3">
                        Busque y seleccione los productos que desea vender:
                      </p>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="text-end fw-normal">
                        <span className="text-muted">Fecha:</span> {fechaCaja}
                      </h6>
                    </div>
                  </div>

                  {/* Formulario de búsqueda */}
                  <form 
                    className="search-form" 
                    onSubmit={(e) => { e.preventDefault(); handleBuscarProductos(); }} // Maneja el evento onSubmit
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="navbarForm"
                        placeholder="Ingrese Código de barra o digite el nombre del producto"
                        value={busqueda}
                        onChange={handleBusquedaChange}
                        aria-label="Buscar productos"
                      />
                      <Button 
                        variant="primary" 
                        className="btn-icon-text" 
                        onClick={handleBuscarProductos} // Maneja el evento onClick
                        disabled={isLoading}
                      >
                        {isLoading ? 'Buscando...' : 'Buscar Producto'}
                      </Button>
                    </div>
                  </form>

                  {/* Mostrar error si existe */}
                  {error && <div className="alert alert-danger mt-3">{error}</div>}

                  {/* Lista de productos filtrados */}
                  <div className="mt-4">
                    <h6>Resultados de búsqueda:</h6>
                    <ul className="list-group">
                      {productos.map((producto) => (
                        <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {producto.nombre} - ${producto.precio}
                          <Button variant="success" onClick={() => agregarAlCarrito(producto)}>
                            Agregar al carrito
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <br />

                  {/* Tabla de productos en el carrito */}
                  <div className="row">
                    <div className="col-lg-7 col-xl-8 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-baseline mb-2">
                            <h6 className="card-title mb-0">Items seleccionados:</h6>
                          </div>
                          <div className="table-responsive">
                            <table className="table table mb-0">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Nombre Producto</th>
                                  <th>Precio</th>
                                  <th>Cantidad</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {carrito.map((producto) => (
                                  <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={producto.cantidad}
                                        onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))}
                                        min="1"
                                        aria-label={`Cantidad de ${producto.nombre}`}
                                      />
                                    </td>
                                    <td>
                                      <Button variant="danger" onClick={() => eliminarDelCarrito(producto.id)}>
                                        Eliminar
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resumen del carrito */}
                    <div className="col-lg-5 col-xl-4 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="card-title mb-0">Carrito de venta</h6>
                          </div>
                          <div className="mt-3">
                            <label className="tx-11 fw-bolder mb-0 text-uppercase"> Sub Total: </label>
                            <p className="text-muted">$ {calcularSubtotal().toFixed(2)}</p>
                          </div>
                          <div className="mt-3 mb-3">
                            <label className="tx-11 fw-bolder mb-0 text-uppercase">IVA:</label>
                            <p className="text-muted">$ {calcularIVA().toFixed(2)}</p>
                          </div>
                          <div className="mt-3 pb-2 border-bottom">
                            <label className="tx-11 fw-bolder mb-0 text-uppercase">Total a Pagar:</label>
                            <p className="text-muted">$ {calcularTotal().toFixed(2)}</p>
                          </div>
                          <div className="mt-3 d-grid gap-2">
                            <Button variant="primary" onClick={handlePagar}>Pagar</Button>
                            <Button variant="outline-primary" onClick={handleCancelar}>Cancelar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caja;
