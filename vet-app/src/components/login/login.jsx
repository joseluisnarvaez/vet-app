import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link  } from 'react-router-dom';
const LoginComponent = () => {
  const [username, setUsername] = useState('jose@admin.cl'); // Estado para almacenar el email
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [error, setError] = useState(''); // Estado para almacenar el mensaje de error
  const headers = {
    'Authorization': ''
  };

  const jsonUser = {
    username: username,
    password: password
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud POST al punto final de autenticación
      await axios.post('http://localhost:8080/authenticate', jsonUser, headers)
      .then(function (response) {   
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
        .catch(function (error) {
            // Si la solicitud falla, muestra el mensaje de error
            setError('Usuario o contraseña incorrecta');
            console.log(error);
        });
        
  };

  return (

    <div className="main-wrapper">
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-8 col-xl-6 mx-auto">
              <div className="card">
                <div className="row">
                  <div className="col-md-4 pe-md-0">
                    <div className="auth-side-wrapper">
                      <img src="./images/login-image.jpg" alt="Login" />
                    </div>
                  </div>
                  <div className="col-md-8 ps-md-0">
                    <div className="auth-form-wrapper px-4 py-5">
                       <Link to="/" className="noble-ui-logo d-block mb-2">
                              Veterinar<span>IA</span>
                        </Link>
                      <h5 className="text-muted fw-normal mb-4">Iniciar sesión</h5>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <form onSubmit={handleSubmit} className="forms-sample">
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-check mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="authCheck"
                          />
                          <label className="form-check-label" htmlFor="authCheck">
                            Recuérdame
                          </label>
                        </div>
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Iniciar Sesión
                          </button>
                        </div>
                        <a href="register.html" className="d-block mt-3 text-muted">
                          Recuperar contraseña
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
