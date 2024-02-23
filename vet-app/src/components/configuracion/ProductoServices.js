
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