import axios from 'axios';

const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  };

  export const setParametros = (data, formularioCategoria)  =>{

    formularioCategoria.formulario[0].value = data.nombre;
    formularioCategoria.formulario[1].value = data.abreviacion;
    formularioCategoria.formulario[2].value = data.porcentajeGanancia;
    formularioCategoria.formulario[3].value = data.descripcion;
    formularioCategoria.formulario[4].value = data.id;
  
  }

  export const funCambioPaginaCategoria = (pagina) => {
    pagina = pagina-1;
    console.log(pagina);
    axios.get(`https://polar-stream-68024-7c3a868138d7.herokuapp.com/categoria/listar?page=${pagina}`, { headers })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  export const getCategorias = () => {
    return  axios.get(`https://polar-stream-68024-7c3a868138d7.herokuapp.com/categoria/listarAll`, { headers })
  };


  export const getCategoriasByPage = (page) =>{
    axios.get('https://polar-stream-68024-7c3a868138d7.herokuapp.com/categoria/listar?page='+page, { headers })
    .then(function (response) {
      console.log(JSON.stringify(response.data.lista));
     return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }