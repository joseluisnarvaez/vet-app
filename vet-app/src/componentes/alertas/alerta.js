import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertaComponente = ({ variant, mensajeAlert, tiempoEspera }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, tiempoEspera || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tiempoEspera]);

  return (
    <>
        <Alert show={showAlert} variant={variant}>
          <p>{mensajeAlert}</p>
        </Alert>
    </>
  );
};

export default AlertaComponente;
