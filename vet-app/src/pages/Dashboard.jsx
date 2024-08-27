import Footer from "../components/template/footer";
import App from "../components/productos/productos";

const Dashboard = () => {
  return (
    <div className="main-wrapper">
        <div className="page-wrapper">
       
          <div className="page-content">
          <nav className="page-breadcrumb">
            <ol className="breadcrumb">

              <li className="breadcrumb-item active" aria-current="page">
                Listado de Productos
              </li>
            </ol>
          </nav>
          <div
            className="d-flex justify-content-between align-items-center flex-wrap grid-margin"
          >
            <div>
              <h4 className="mb-3 mb-md-0">Listado de Productos</h4>
            </div>
          </div>
            <div className="card">
              <div className="card-body">

                <App />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default Dashboard;
