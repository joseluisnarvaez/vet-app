export const setParametrosLote = (data, formularioLote, isVista = false) => {
  formularioLote.formulario.forEach((field) => {
      switch (field.name) {
        case 'fechaCreacion':
          field.value = isVista ? data.fechaCreacion : data.fechaCreacion;
          break;
        case 'fechaVencimiento':
          field.value = isVista ? data.fechaVencimiento : data.fechaVencimiento;
          break;
        case 'stockProducto':
          field.value = isVista ? data.stockProducto : data.stockProducto;
          break;
        case 'idProducto':
          field.value = isVista ? data.idProducto : data.idProducto;
          break;
        case 'numLote':
          field.value = isVista ? data.numLote : data.numLote;
          break;
        case 'id':
          field.value = data.id;
          break;
        default:
          break;
      }
    });
  };
