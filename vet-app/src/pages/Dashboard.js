import Footer from "../components/template/footer";
import Header from "../components/template/header";
import Menu from "../components/template/menu";
import App from "../components/productos/productos";

const Dashboard = () => {
  return (
    <>
      <div class="main-wrapper">
        <Menu />
        <div class="page-wrapper">
          <Header />
          <div class="page-content">
          <nav class="page-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Listado de Productos
              </li>
            </ol>
          </nav>
          <div
            class="d-flex justify-content-between align-items-center flex-wrap grid-margin"
          >
            <div>
              <h4 class="mb-3 mb-md-0">Listado de Productos</h4>
            </div>
          </div>
            <div class="card">
            <div class="card-body">
            <h6 class="card-title">Mi listado de productos</h6>
                    <p class="text-muted mb-3">
                      Aquí podrá administrar sus productos de forma fácil y
                      sencilla. Si necesita ayuda pinche
                      <a href="#" target="_blank"> aquí</a>
                    </p>
            <App />
            </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
