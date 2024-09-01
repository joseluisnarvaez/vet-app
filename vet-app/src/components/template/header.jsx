import React from 'react';
import { NavDropdown, Nav, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para la navegación

const Header = () => {
  const navigate = useNavigate();  // Hook de navegación de React Router

  // Verifica si el usuario está autenticado revisando si hay un token en el localStorage
  const isAuthenticated = !!localStorage.getItem('token'); // Convertimos a booleano

  // Función para manejar el logout
  const handleLogout = () => {
    // Eliminar el token de autenticación del localStorage
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de login
    navigate('/');
  };

  return (
    <Nav className="navbar">
      <div className="navbar-content">
        <form className="search-form">
          {/* Este espacio está reservado para un formulario de búsqueda en el futuro */}
        </form>

        {/* Mostrar el Dropdown de usuario solo si el usuario está autenticado */}
        {isAuthenticated && (
          <NavDropdown
            className="nav-link dropdown"
            title={
              <div className="">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9USkGInprmw5sqShHeEUrAcaPa7cAaK6HrQ&usqp=CAU"
                  width="30"
                  height="30"
                  className="rounded-circle mr-2"
                  alt="profile"
                />
              </div>
            }
            id="nav-dropdown"
          >
           {/* <NavDropdown.Item href="#profile">Perfil</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Configuración</NavDropdown.Item>
            <NavDropdown.Divider /> {/* Separador para mayor claridad */}
            <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item> {/* Opción de logout */}
          </NavDropdown>
        )}
      </div>
    </Nav>
  );
};

export default Header;
