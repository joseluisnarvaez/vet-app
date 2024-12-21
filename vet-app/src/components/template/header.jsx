import React, { useState, useEffect } from 'react';
import { NavDropdown, Nav, Image, Modal, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell } from 'react-feather';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const isAuthenticated = !!localStorage.getItem('token');

  // Notificaciones activas (filtradas)
  const activeNotifications = notifications.filter((n) => n.activa);

  // Contador de notificaciones pendientes
  const pendingNotificationsCount = activeNotifications.length;

  // Función para cargar notificaciones desde el backend
  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/notificaciones', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotifications(
        response.data.map((notificacion) => ({
          id: notificacion.id,
          message: notificacion.glosa,
          date: new Date(notificacion.fechaCreacion).toLocaleString(),
          activa: notificacion.activa ?? true,
        }))
      );
    } catch (err) {
      console.error('Error al cargar las notificaciones:', err);
      setError('Error al cargar las notificaciones.');
    } finally {
      setLoading(false);
    }
  };

  // Función para marcar una notificación como inactiva
  const updateNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:8080/notificaciones/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Actualizar el estado local
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, activa: false } : n
        )
      );
    } catch (err) {
      console.error('Error al actualizar la notificación:', err);
      setError('No se pudo actualizar la notificación.');
    }
  };

  // Cargar notificaciones al iniciar y al cambiar de página
  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
    }
  }, [location, isAuthenticated]);

  // Manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Abrir el modal con una notificación seleccionada
  const handleNotificationClick = (notification) => {
    // Marcar como inactiva en el estado local inmediatamente
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, activa: false } : n
      )
    );

    // Establecer la notificación seleccionada para mostrarla en el modal
    setSelectedNotification(notification);
    setShowModal(true);
  };

  // Cerrar el modal y sincronizar con el backend
  const handleCloseModal = async () => {
    if (selectedNotification) {
      await updateNotification(selectedNotification.id); // Actualiza en el backend y estado local
    }
    setShowModal(false);
    setSelectedNotification(null);
  };

  return (
    <>
      <Nav className="navbar">
        <div className="navbar-content">
          <form className="search-form">
            {/* Este espacio está reservado para un formulario de búsqueda en el futuro */}
          </form>

          {/* Mostrar la campana de notificaciones si el usuario está autenticado */}
          {isAuthenticated && (
            <NavDropdown
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Bell size={20} style={{ marginRight: '5px' }} />
                  {pendingNotificationsCount > 0 && (
                    <span className="badge badge-danger">
                      {pendingNotificationsCount}
                    </span>
                  )}
                </div>
              }
              id="notification-dropdown"
            >
              {loading ? (
                <NavDropdown.Item>Cargando notificaciones...</NavDropdown.Item>
              ) : error ? (
                <NavDropdown.Item>{error}</NavDropdown.Item>
              ) : activeNotifications.length > 0 ? (
                activeNotifications.map((notification) => (
                  <NavDropdown.Item
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {notification.message}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item>No tienes notificaciones</NavDropdown.Item>
              )}
            </NavDropdown>
          )}

          {/* Mostrar el Dropdown de usuario */}
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
              id="user-dropdown"
            >
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </Nav>

      {/* Modal para mostrar detalles de la notificación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Notificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification ? (
            <>
              <p><strong>Mensaje:</strong> {selectedNotification.message}</p>
              <p><strong>Fecha:</strong> {selectedNotification.date}</p>
            </>
          ) : (
            <p>No hay información disponible.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
