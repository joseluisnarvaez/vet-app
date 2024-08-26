import Button from 'react-bootstrap/Button';

const Caja = () => {
 return (
  <div className="main-wrapper">
   
    <div className="page-wrapper">
   
       <div className="page-content">
       <div
            className="d-flex justify-content-between align-items-center flex-wrap grid-margin"
          >
            <div>
              <h4 className="mb-3 mb-md-0">Caja</h4>
            </div>
          </div>
       </div>


       <div className="row">
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body justify-content-between">
                    <h6 className="card-title">Venta de productos</h6>
                    
                    <div className="container-fluid d-flex justify-content-between">
                      <div className="col-lg-7 ps-0">
                        <p className="text-muted mb-3">
                          Busque y seleccione los productos que desea vender:
                        </p>
                      </div>
                      <div className="col-lg-3">
                        <h6 className="text-end fw-normal"><span className="text-muted">Fecha:</span> 14 de Noviembre - 2023</h6>
                      </div>
                    </div>
                    <form className="search-form">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="navbarForm"
                          placeholder="Ingrese Código de barra o digite el nombre del producto"
                        />
                        <Button
                          
                          className="btn btn-primary btn-icon-text"
                          data-bs-toggle="modal"
                          data-bs-target="#varyingModal"
                          data-bs-whatever="@mdo"
                        >
                          Buscar Producto
                        </Button>
                      </div>
                    </form>
                    <br />
                    <div className="row">
                      <div className="col-lg-7 col-xl-8 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <div
                              className="d-flex justify-content-between align-items-baseline mb-2"
                            >
                              <h6 className="card-title mb-0">
                                Items seleccionados:
                              </h6>
                              <div className="dropdown mb-2">
                                <Button id="dropdownMenuButton7"  data-bs-toggle="dropdown"   aria-haspopup="true"   aria-expanded="false" >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-more-horizontal icon-lg text-muted pb-3px"
                                  >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                  </svg>
                                </Button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton7"
                                >
                                  <Button  className="dropdown-item d-flex align-items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-eye icon-sm me-2"
                                    >
                                      <path
                                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                      ></path>
                                      <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <span className="">View</span>
                                  </Button>

                                  <Button className="dropdown-item d-flex align-items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-edit-2 icon-sm me-2"
                                    >
                                      <path
                                        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                                      ></path>
                                    </svg>
                                    <span className="">Edit</span>
                                    
                                  </Button>
                                  <Button className="dropdown-item d-flex align-items-center" href="#" >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-trash icon-sm me-2"
                                    >
                                      <polyline
                                        points="3 6 5 6 21 6"
                                      ></polyline>
                                      <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                      ></path>
                                    </svg>
                                    <span className="">Delete</span></Button>
                                  <Button className="dropdown-item d-flex align-items-center"> 
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-printer icon-sm me-2"
                                    >
                                      <polyline
                                        points="6 9 6 2 18 2 18 9"
                                      ></polyline>
                                      <path
                                        d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                                      ></path>
                                      <rect
                                        x="6"
                                        y="14"
                                        width="12"
                                        height="8"
                                      ></rect>
                                    </svg>
                                    <span className="">Print</span></Button>
                                  <Button className="dropdown-item d-flex align-items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-download icon-sm me-2"
                                    >
                                      <path
                                        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                      ></path>
                                      <polyline
                                        points="7 10 12 15 17 10"
                                      ></polyline>
                                      <line
                                        x1="12"
                                        y1="15"
                                        x2="12"
                                        y2="3"
                                      ></line>
                                    </svg>
                                    <span className="">Download</span></Button>
                                </div>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table className="table table mb-0">
                                <thead>
                                  <tr>
                                    <th className="pt-0">ID</th>
                                    <th className="pt-0">Nombre Producto</th>
                                    <th className="pt-0">Precio</th>
                                    <th className="pt-0">Cantidad Stock</th>
                                    <th className="pt-0">Acciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>Casa Perro XL</td>
                                    <td>$ <span>99.990</span></td>
                                    <td>
                                      <div className="input-group input-count">
                                        <span className="input-group-btn">
                                          <Button
                                            
                                            className="btn btn-default btn-number"
                                            data-type="minus"
                                            data-field="quant[1]"
                                          >
                                            <span
                                              className="glyphicon glyphicon-minus"
                                              >-</span
                                            >
                                          </Button>
                                        </span>
                                        <input
                                          type="text"
                                          name="quant[1]"
                                          className="form-control input-number"
                                          value="1"
                                          min="1"
                                          max="10"
                                        />
                                        <span className="input-group-btn">
                                          <Button
                                            
                                            className="btn btn-default btn-number"
                                            data-type="plus"
                                            data-field="quant[1]"
                                          >
                                            <span
                                              className="glyphicon glyphicon-plus"
                                              >+</span
                                            >
                                          </Button>
                                        </span>
                                      </div>

                                    </td>
                                    <td>
                                      <Button className="btn btn-inverse-primary">Agregar</Button>
                                      <Button  className="btn btn-inverse-danger btn-icon">
                                        <i data-father="x-circle"></i>
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-xl-4 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <h6 className="card-title mb-0">Carrito de venta</h6>
                            </div>
                            <div className="mt-3">
                              <label className="tx-11 fw-bolder mb-0 text-uppercase"> Sub Total: </label>
                              <p className="text-muted">$ <span>34.590</span></p>
                            </div>
                            <div className="mt-3 mb-3">
                              <label className="tx-11 fw-bolder mb-0 text-uppercase">IVA:</label>
                              <p className="text-muted">$ <span>12.990</span></p>
                            </div>
                            <div className="mt-3 pb-2 border-bottom">
                              <label className="tx-11 fw-bolder mb-0 text-uppercase">Total a Pagar:</label>
                              <p className="text-muted">$ <span>99.990</span></p>
                            </div>
                            <div className="mt-3 d-grid gap-2">
                              <Button variant="primary" className="btn btn-primary">Pagar</Button>
                              <Button variant="light" className="btn btn-outline-primary">Cancelar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
 );
};

export default Caja;