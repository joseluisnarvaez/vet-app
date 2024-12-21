
  export const setParametros = (data, formularioProducto)  =>{

    formularioProducto.formulario[0].value = data.nombre;
    formularioProducto.formulario[1].value = data.descripcion;
    formularioProducto.formulario[2].value = data.codBarra;
    formularioProducto.formulario[3].value = data.precioVenta;
    formularioProducto.formulario[4].value = data.precioCompra;
    formularioProducto.formulario[5].value = data.stock;
    formularioProducto.formulario[6].value = data.presentacion;
    formularioProducto.formulario[7].value = data.cantidadPresentacion;
    formularioProducto.formulario[8].value = data.pesoCantidad;
    formularioProducto.formulario[9].value = data.pesoUnidad;
    formularioProducto.formulario[10].value = data.instruccionesUso;
    formularioProducto.formulario[11].value = data.idCategoria;
    formularioProducto.formulario[12].value = data.idProveedor;
    formularioProducto.formulario[13].value = data.idSubCategoria;
    formularioProducto.formulario[14].value = data.id; 
  
  }

  // Función para obtener subcategorías de una categoría específica
export const obtenerSubcategorasDeCategoria = async () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}subcategorias/categoria/${idCategoria}`;
  try {
    const response = await axios.get(apiUrl, { headers: getHeaders() });
    return response.data; // Devuelve los datos directamente
  } catch (error) {
    console.error('Error al obtener subcategorías:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};