import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './componentes/login';
import ProductosComponent from './componentes/productos/productos'; 

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
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/productos" element={<ProtectedRoute element={<ProductosComponent />} />}/>
      </Routes>
    </Router>
  );
}

export default App;
