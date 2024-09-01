import axios from 'axios';

// Función para obtener headers con el token más reciente
const getHeaders = () => ({
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

// Función para obtener subcategorías de una categoría específica
export const obtenerSubcategorasDeCategoria = async (idCategoria) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}subcategorias/categoria/${idCategoria}`;
  try {
    const response = await axios.get(apiUrl, { headers: getHeaders() });
    return response.data; // Devuelve los datos directamente
  } catch (error) {
    console.error('Error al obtener subcategorías:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función unificada para establecer parámetros en un formulario
export const setParametrosFormulario = (data, formularioSubCategoria, isMuestra = false) => {
  const fields = isMuestra ? 
    {
      subNombre: data.nombre,
      subAbreviacion: data.abreviacion,
      porcentajeGananciaSubCategoria: data.porcentajeGanancia,
      subDescripcion: data.descripcion,
      idCategoria: data.categoria,
    } : 
    {
      subNombre: data.subNombre,
      subAbreviacion: data.subAbreviacion,
      porcentajeGananciaSubCategoria: data.porcentajeGananciaSubCategoria,
      subDescripcion: data.subDescripcion,
      idCategoria: data.idCategoria,
      id: data.id,
    };

  formularioSubCategoria.formulario.forEach(field => {
    if (fields[field.name] !== undefined) {
      field.value = fields[field.name];
    }
  });
};
