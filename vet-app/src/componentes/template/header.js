import React from 'react';

const NavbarComponent = () => {
  return (<nav class="navbar" >
  <a href="#" class="sidebar-toggler">
    <i data-feather="menu"></i>
  </a>
  <div class="navbar-content">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="messageDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i data-feather="mail"></i>
        </a>
        <div
          class="dropdown-menu p-0"
          aria-labelledby="messageDropdown"
        >
          <div
            class="px-3 py-2 d-flex align-items-center justify-content-between border-bottom"
          >
            <p>2 Nuevos mensajes</p>
            <a href="javascript:;" class="text-muted">Limpiar</a>
          </div>
          <div class="p-1">
            <a
              href="javascript:;"
              class="dropdown-item d-flex align-items-center py-2"
            >
              <div class="me-3">
                <img
                  class="wd-30 ht-30 rounded-circle"
                  src="https://via.placeholder.com/30x30"
                  alt="userr"
                />
              </div>
              <div class="d-flex justify-content-between flex-grow-1">
                <div class="me-4">
                  <p>Producto 23</p>
                  <p class="tx-12 text-muted">Bajo Stock</p>
                </div>
                <p class="tx-12 text-muted">1H atrás</p>
              </div>
            </a>
            <a
              href="javascript:;"
              class="dropdown-item d-flex align-items-center py-2"
            >
              <div class="me-3">
                <img
                  class="wd-30 ht-30 rounded-circle"
                  src="https://via.placeholder.com/30x30"
                  alt="userr"
                />
              </div>
              <div class="d-flex justify-content-between flex-grow-1">
                <div class="me-4">
                  <p>José Narvaez</p>
                  <p class="tx-12 text-muted">Señor vetyerinario ....</p>
                </div>
                <p class="tx-12 text-muted">30 min atrás</p>
              </div>
            </a>
          </div>
          <div
            class="px-3 py-2 d-flex align-items-center justify-content-center border-top"
          >
            <a href="javascript:;">ver todo</a>
          </div>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="notificationDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i data-feather="bell"></i>
          <div class="indicator">
            <div class="circle"></div>
          </div>
        </a>
        <div
          class="dropdown-menu p-0"
          aria-labelledby="notificationDropdown"
        >
          <div
            class="px-3 py-2 d-flex align-items-center justify-content-between border-bottom"
          >
            <p>Notificaicones</p>
          </div>
          <div class="p-1">
            <a
              href="javascript:;"
              class="dropdown-item d-flex align-items-center py-2"
            >
              <div
                class="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3"
              >
                <i class="icon-sm text-white" data-feather="gift"></i>
              </div>
              <div class="flex-grow-1 me-2">
                <p>Orden recibida</p>
                <p class="tx-12 text-muted">30 min atrás</p>
              </div>
            </a>
          </div>
          <div
            class="px-3 py-2 d-flex align-items-center justify-content-center border-top"
          >
            <a href="javascript:;">Ver todas</a>
          </div>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="profileDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            class="wd-30 ht-30 rounded-circle"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9USkGInprmw5sqShHeEUrAcaPa7cAaK6HrQ&usqp=CAU"
            alt="profile"
          />
        </a>
        <div
          class="dropdown-menu p-0"
          aria-labelledby="profileDropdown"
        >
          <div
            class="d-flex flex-column align-items-center border-bottom px-5 py-3"
          >
            <div class="mb-3">
              <img
                class="wd-80 ht-80 rounded-circle"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9USkGInprmw5sqShHeEUrAcaPa7cAaK6HrQ&usqp=CAU"
                alt=""
              />
            </div>
            <div class="text-center">
              <p class="tx-16 fw-bolder" ></p>
              <p class="tx-12 text-muted">fuenzalida@gmail.com</p>
            </div>
          </div>
          <ul class="list-unstyled p-1">
            <li class="dropdown-item py-2">
              <a
                href="#"
                class="text-body ms-0"
              >
                <i class="me-2 icon-md" data-feather="user"></i>
                <span>Perfil</span>
              </a>
            </li>
            <li class="dropdown-item py-2">
              <a href="javascript:;" class="text-body ms-0">
                <i class="me-2 icon-md" data-feather="log-out"></i>
                <span><a href="./logout">Cerrar Sesión</a> </span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</nav>
  );
};
export default NavbarComponent;