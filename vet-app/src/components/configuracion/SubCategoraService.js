import axios from 'axios';

const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  };


  export const obtenerSubcategorasDeCategoria = async (idCategoria) => {
    const apiUrl = 'https://polar-stream-68024-7c3a868138d7.herokuapp.com/subcategorias/categoria/'+idCategoria;
    try {
      const response = await axios.get(apiUrl, { headers });
      return response; // Devuelve los datos directamente
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const setParametros = (data, formularioSubCategoria)  =>{

    formularioSubCategoria.formulario[0].value = data.subNombre;
    formularioSubCategoria.formulario[1].value = data.subAbreviacion;
    formularioSubCategoria.formulario[3].value = data.porcentajeGananciaSubCategoria;
    formularioSubCategoria.formulario[2].value = data.subDescripcion;
    formularioSubCategoria.formulario[4].value = data.idCategoria;
    formularioSubCategoria.formulario[5].value = data.id;
  
  }

  export const setParametrosMuestra = (data, formularioSubCategoria)  =>{

    formularioSubCategoria.formulario[0].value = data.nombre;
    formularioSubCategoria.formulario[1].value = data.abreviacion;
    formularioSubCategoria.formulario[3].value = data.porcentajeGanancia;
    formularioSubCategoria.formulario[2].value = data.descripcion;
    formularioSubCategoria.formulario[4].value = data.categoria;

  
  }