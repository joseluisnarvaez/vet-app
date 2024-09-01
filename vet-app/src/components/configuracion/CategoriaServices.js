import axios from 'axios';

// Función para obtener headers con el token más reciente
const getHeaders = () => ({
  'Authorization': localStorage.getItem('token'), // Asegura que siempre tengas el token más reciente
  'Content-Type': 'application/json'
});

// Función para establecer los parámetros de un formulario
export const setParametros = (data, formularioCategoria) => {
  formularioCategoria.formulario[0].value = data.nombre;
  formularioCategoria.formulario[1].value = data.abreviacion;
  formularioCategoria.formulario[2].value = data.porcentajeGanancia;
  formularioCategoria.formulario[3].value = data.descripcion;
  formularioCategoria.formulario[4].value = data.id;
};

// Función para cambiar la página de categorías
export const funCambioPaginaCategoria = async (pagina) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}categoria/listar?page=${pagina - 1}`, {
      headers: getHeaders()
    });
    return response.data; // Retorna los datos para poder manejarlos después
  } catch (error) {
    console.error('Error fetching page data:', error);
    throw error; // Lanza el error para manejarlo a nivel del componente
  }
};

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}categoria/listarAll`, {
      headers: getHeaders()
    });
    console.log(JSON.stringify(response.data.lista));
    return response.data; // Retorna los datos directamente
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error; // Lanza el error para manejarlo a nivel del componente
  }
};

// Obtener categorías por página
export const getCategoriasByPage = async (page) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}categoria/listar?page=${page}`, {
      headers: getHeaders()
    });
    console.log(JSON.stringify(response.data.lista));
    return response.data; // Retorna los datos para poder manejarlos después
  } catch (error) {
    console.error('Error fetching categories by page:', error);
    throw error; // Lanza el error para manejarlo a nivel del componente
  }
};
