import axios from 'axios';

const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  };

export const getAllProveedores = () => {
    return  axios.get(`https://polar-stream-68024-7c3a868138d7.herokuapp.comproveedor/listarAll`, { headers })
};

export const setParametros = (data, formularioProveedor)  =>{

  formularioProveedor.formulario[0].value = data.provNombre;
  formularioProveedor.formulario[1].value = data.provDireccion
  formularioProveedor.formulario[3].value = data.provEmail
  formularioProveedor.formulario[2].value = data.provTelefono
  formularioProveedor.formulario[4].value = data.provDescripcion
  formularioProveedor.formulario[5].value = data.id;

}


export const setParametrosVista = (data, formularioProveedor)  =>{

  formularioProveedor.formulario[0].value = data.nombre;
  formularioProveedor.formulario[1].value = data.direccion
  formularioProveedor.formulario[3].value = data.email
  formularioProveedor.formulario[2].value = data.telefono
  formularioProveedor.formulario[4].value = data.descripcion
  formularioProveedor.formulario[5].value = data.id;

}