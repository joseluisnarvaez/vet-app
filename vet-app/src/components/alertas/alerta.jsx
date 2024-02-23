import Alert from 'react-bootstrap/Alert';

const AlertaComponente = ({ variant, mensajeAlert,  mostrarAlerta }) => {

  return (
    <>
        <Alert show={mostrarAlerta} variant={variant}>
          <p>{mensajeAlert}</p>
        </Alert>
    </>
  );
};

export default AlertaComponente;
