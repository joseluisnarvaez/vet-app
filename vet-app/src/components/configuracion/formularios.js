// formulario.js
import {getCategorias} from './CategoriaServices';
import {getAllProveedores} from './proveedorService';
import {obtenerSubcategorasDeCategoria} from './SubCategoraService';

export const formularioCategoria = {
    nameButton: 'Agregar categoria',
    title: 'Agregar categoria',
    titleEditar: 'Editar categoria',
    nameButtonEditar: 'Editar categoria',
    titleModal: 'Categoria',
    formulario: [
     
      {
        label: 'Nombre',
        name: 'nombre',
        type: 'text',
        placeholder: 'Ingrese nombre',
        value: ''
      },
      {
        label: 'Abreviacion',
        type: 'text',
        name: 'abreviacion',
        placeholder: 'Ingrese abreviacion',
        value: ''
      },
      {
        label: 'Porcentaje Ganancia',
        type: 'number',
        name: 'porcentajeGanancia',
        placeholder: 'Ingrese Porcentaje Ganancia',
        value: ''
      },
      {
        label: 'Descripcion',
        type: 'textarea',
        name: 'descripcion',
        placeholder: 'Ingrese descripcion',
        value: ''
      },
      {
        name: 'id',
        type: 'hidden',
        value: ''
      },

    ]
  };


  
export const formularioSubCategoria = {
  nameButton: 'Agregar Subcategoria',
  title: 'Agregar Subcategoria',
  titleEditar: 'Editar Subcategoria',
  titleModal: 'Sub-Categoria',
  formulario: [
    {
      label: 'nombre',
      name: 'subNombre',
      type: 'text',
      placeholder: 'Ingrese nombre',
      value: ''
    },
    {
      label: 'abreviacion',
      name: 'subAbreviacion',
      type: 'text',
      placeholder: 'Ingrese abreviacion',
      value: ''
    },
    {
      label: 'descripcion',
      name: 'subDescripcion',
      type: 'textarea',
      placeholder: 'Ingrese descripcion',
      value: ''
    },
    {
      label: 'Porcentaje Ganancia',
      type: 'number',
      name: 'porcentajeGananciaSubCategoria',
      placeholder: 'Ingrese Porcentaje Ganancia',
      value: ''
    },
    {
      label: 'Categoria',
      type: 'select',
      name: 'idCategoria',
      value: '',
      valueDependecy: '',
      loadValues:() => new Promise((res) => {
        res(getCategorias())
      })
    },
    {
      name: 'id',
      type: 'hidden',
      value: ''
    },
  ]
};
  
export const formularioProducto = {
  nameButton: 'Agregar Producto',
  title: 'Agregar Producto',
  titleEditar: 'Editar Producto',
  titleModal: 'Producto',
  formulario: [
    {
      label: 'Nombre',
      name: 'nombre',
      type: 'text',
      placeholder: 'Ingrese nombre',
      value: ''
    },
    {
      label: 'Descripcion',
      name: 'descripcion',
      type: 'textarea',
      placeholder: 'Ingrese descripcion',
      value: ''
    },
    {
      label: 'Codigo Barra',
      name: 'codBarra',
      type: 'number',
      placeholder: 'Ingrese Precio Compra',
      value: ''
    },
    {
      label: 'Precio Compra',
      name: 'precioCompra',
      type: 'number',
      placeholder: 'Ingrese Precio Compra',
      value: ''
    },
    {
      label: 'Precio Venta',
      name: 'precioVenta',
      type: 'number',
      placeholder: 'Ingrese Precio Venta',
      value: ''
    },
    
    {
      label: 'Stock',
      name: 'stock',
      type: 'number',
      placeholder: 'Ingrese Stock',
      value: ''
    },
    {
      label: 'Presentacion',
      name: 'presentacion',
      type: 'text',
      placeholder: 'Ingrese Presentacion',
      value: ''
    },
    {
      label: 'Cantidad Presentacion',
      name: 'cantidadPresentacion',
      type: 'text',
      placeholder: 'Ingrese Cantidad Presentacion',
      value: ''
    },
    {
      label: 'Peso Cantidad',
      name: 'pesoCantidad',
      type: 'text',
      placeholder: 'Ingrese Peso Presentacion',
      value: ''
    },
    {
      label: 'Peso Unidad',
      name: 'pesoUnidad',
      type: 'text',
      placeholder: 'Ingrese Peso Presentacion',
      value: ''
    },
    {
      label: 'Instrucciones de Uso',
      name: 'instruccionesUso',
      type: 'textarea',
      placeholder: 'Ingrese Instrucciones de Uso',
      value: ''
    },
    {
      label: 'Seleccione Categoria',
      name: 'idCategoria',
      type: 'select',
      placeholder: 'Ingrese abreviacion',
      valueDependecy: '',
      loadValues:() => new Promise((res) => {
        res(getCategorias())
      })
    },
    {
      label: 'Seleccione Proveedor',
      name: 'idProveedor',
      type: 'select',
      placeholder: 'Ingrese abreviacion',
      valueDependecy: '',
      loadValues:() => new Promise((res) => {
        
        res(getAllProveedores())
      })
    },
    {
      label: 'Seleccione SubCategoria',
      name: 'idSubCategoria',
      type: 'select',
      placeholder: 'Ingrese Instrucciones de Uso',
      value: '',
      valueDependecy: '',
      loadValues:(id) => new Promise((res) => {
        res(obtenerSubcategorasDeCategoria(id))
      })
    },
    {
      name: 'id',
      type: 'hidden',
      value: ''
    },
  ]
};


export const formularioProveedor = {
  nameButton: 'Agregar Proveedor',
  title: 'Agregar Proveedor',
  titleEditar: 'Editar Proveedor',
  nameButtonEditar: 'Editar Proveedor',
  titleModal: 'Proveedor',
  formulario: [
   
    {
      label: 'Nombre',
      name: 'provNombre',
      type: 'text',
      placeholder: 'Ingrese Nombre',
      value: ''
    },
    {
      label: 'Direccion',
      type: 'text',
      name: 'provDireccion',
      placeholder: 'Ingrese Direccion',
      value: ''
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'provTelefono',
      placeholder: 'Ingrese Telefono',
      value: ''
    },
    {
      label: 'Email',
      type: 'text',
      name: 'provEmail',
      placeholder: 'Ingrese Email',
      value: ''
    },
    {
      label: 'Descripcion',
      type: 'textarea',
      name: 'provDescripcion',
      placeholder: 'Ingrese Descripcion',
      value: ''
    },
    {
      name: 'id',
      type: 'hidden',
      value: ''
    },

  ]
};
