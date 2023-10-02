import { useState } from "react";
import { Box, Mail, Calendar } from 'react-feather';
const options = [
  {
    name: "Menu",
    scroll: true,
    backdrop: true,
  },
];

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
    <nav class="sidebar">
      <div class="sidebar-header">
            <a href="#" class="sidebar-brand"> Veterinar<span>IA</span> </a>
            <div class="sidebar-toggler not-active" onClick={toggleShow}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="sidebar-body">
          <ul class="nav">
            <li class="nav-item nav-category">Inicio</li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#inicio"
                role="button"
                aria-expanded="false"
                aria-controls="inicio"
              >
                <Box size={18}/>

                <span class="link-title">Dashboard</span>
                <i class="link-arrow" data-feather="chevron-down"></i>
              </a>
              <div class="collapse" id="inicio">
                <ul class="nav sub-menu">
                  <li class="nav-item">
                    <a href="#" class="nav-link">Lista de Productos</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item nav-category">Inicio</li>
            <li class="nav-item">
              <a href="#" class="nav-link">
              <Mail size={18}/>
                <span class="link-title">Notificaciones</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
              <Calendar size={18}/>
                <span class="link-title">Eventos</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>

  );
}

function Menu() {
  return (
    <>
      {options.map((props, idx) => (
        <OffCanvasExample key={idx} {...props} />
      ))}
    </>
  );
}

export default Menu;
