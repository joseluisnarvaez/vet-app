import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Routers from './Routers';
import Dashboard from './pages/Dashboard';
import Login from './components/login/login';

// Función de verificación de sesión (puedes personalizarla según tus necesidades)
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Comprueba si el token de autenticación existe en el almacenamiento local
  return token !== null; // Devuelve true si el token existe (usuario autenticado), de lo contrario, false.
};

// Componente de enrutamiento protegido que redirige al componente de inicio de sesión si el usuario no está autenticado
const ProtectedRoute = ({ element }) => {
  if (isAuthenticated()) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

function App() {
  return (
    <Routers>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routers>
  );
}

export default App;