import axios from 'axios';

// Función para obtener headers con el token más reciente
const getHeaders = () => ({
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

// Función para obtener todos los proveedores
export const getAllProveedores = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}proveedor/listarAll`, { headers: getHeaders() });
    return response.data; // Retorna los datos directamente
  } catch (error) {
    console.error('Error fetching all providers:', error);
    throw error; // Lanza el error para manejarlo a nivel del componente
  }
};

// Función unificada para establecer parámetros en un formulario
export const setParametros = (data, formularioProveedor, isVista = false) => {
  formularioProveedor.formulario.forEach((field) => {
    switch (field.name) {
      case 'provNombre':
        field.value = isVista ? data.nombre : data.provNombre;
        break;
      case 'provDireccion':
        field.value = isVista ? data.direccion : data.provDireccion;
        break;
      case 'provEmail':
        field.value = isVista ? data.email : data.provEmail;
        break;
      case 'provTelefono':
        field.value = isVista ? data.telefono : data.provTelefono;
        break;
      case 'provDescripcion':
        field.value = isVista ? data.descripcion : data.provDescripcion;
        break;
      case 'id':
        field.value = data.id;
        break;
      default:
        break;
    }
  });
};
