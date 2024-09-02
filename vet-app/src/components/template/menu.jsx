import React, { useEffect,  useCallback } from "react";
import { Box } from 'react-feather';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useLocation } from "react-router-dom";  // Importar useLocation

const options = [
  {
    name: "Menu",
    scroll: true,
    backdrop: false
  }
];

// Componente para el menú OffCanvas
function OffCanvasMenu({ show, ...props }) {
  return (
    <Offcanvas show={show} style={{ width: '11%', border: 'none' }} {...props}>
      <Nav className="sidebar">
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-brand"> Veterinar<span>IA</span> </NavLink>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            {/** Reutilización de enlaces de menú */}
            <SidebarLink to="/Dashboard" title="Dashboard" />
            <SidebarLink to="/caja" title="Caja" />
            <SidebarLink to="/ventas" title="Ventas" />
          </ul>
        </div>
      </Nav>
    </Offcanvas>
  );
}

// Componente para cada enlace del menú lateral
function SidebarLink({ to, title }) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={to}>
        <Box size={18} />
        <span className="link-title">{title}</span>
        <i className="link-arrow" data-feather="chevron-down"></i>
      </NavLink>
    </li>
  );
}

// Componente principal del menú
function Menu() {
  const location = useLocation();  // Usar useLocation para obtener la ruta actual

  // Función memorizada para verificar si el menú debe mostrarse
  const shouldShowMenu = useCallback(() => {
    console.log(location.pathname);
    return location.pathname !== "/";
  }, [location.pathname]);

  useEffect(() => {
    shouldShowMenu();  // Llamar a la función memorizada
  }, [shouldShowMenu]);  // Incluir shouldShowMenu como dependencia

  return (
    <>
      {shouldShowMenu() && options.map((props, idx) => (
        <OffCanvasMenu key={idx} show={true} {...props} />
      ))}
    </>
  );
}

export default Menu;
