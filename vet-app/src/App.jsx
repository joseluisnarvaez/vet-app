import { Route, Navigate, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/login/login';
import Caja from './components/caja/caja';
import Menu from './components/template/menu';
import Header from './components/template/header';
import Ventas from './components/ventas/Ventas';

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
    <BrowserRouter>
       <Menu />
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/caja"  element={<ProtectedRoute element={<Caja />} />} />
          <Route path="/ventas" element={<ProtectedRoute element={<Ventas />} />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;