import React, { useState } from 'react';

// Lista de preguntas según la encuesta
const preguntas = [
  "¿Piensa que su familiar le pide más ayuda de la que realmente necesita?",
  "¿Piensa que debido al tiempo que dedica a su familiar no tiene suficiente tiempo para ud.?",
  "¿Se siente agobiado por intentar compatibilizar el cuidado de su familiar con otras responsabilidades (trabajo, familia)?",
  "¿Siente vergüenza por la conducta de su familiar?",
  "¿Se siente enfadado cuando está cerca de su familiar?",
  "¿Piensa que el cuidar de su familiar afecta negativamente la relación que usted tiene con otros miembros de su familia?",
  "¿Tiene miedo por el futuro de su familiar?",
  "¿Piensa que su familiar depende de usted?",
  "¿Se siente tenso cuando está cerca de su familiar?",
  "¿Piensa que su salud ha empeorado debido a tener que cuidar de su familiar?",
  "¿Piensa que no tiene tanta intimidad como le gustaría debido al cuidado de su familiar?",
  "¿Piensa que su vida social se ha visto afectada de manera negativa por tener que cuidar a su familiar?",
  "¿Se siente incómodo por distanciarse de sus amistades debido al cuidado de su familiar?",
  "¿Piensa que su familiar le considera a usted la única persona que le puede cuidar?",
  "¿Piensa que no tiene suficientes ingresos económicos para los gastos de cuidar a su familiar, además de sus otros gastos?",
  "¿Siente que no se ve capaz de cuidar a su familiar por mucho más tiempo?",
  "¿Siente que ha perdido el control de su vida desde que comenzó la enfermedad de su familiar?",
  "¿Desearía poder dejar el cuidado de su familiar a otra persona?",
  "¿Se siente indeciso sobre qué hacer con su familiar?",
  "¿Piensa que debería hacer más por su familiar?",
  "¿Piensa que podría cuidar mejor a su familiar?",
  "Globalmente, ¿qué grado de “carga” experimenta por el hecho de cuidar a su familiar?"
];

// Rango de valores para las respuestas
const respuestas = [
  { value: 0, label: '0-Nunca' },
  { value: 1, label: '1-Rara vez' },
  { value: 2, label: '2-Algunas veces' },
  { value: 3, label: '3-Bastantes veces' },
  { value: 4, label: '4-Casi siempre' }
];

const ZaritSurvey = () => {
  // Estado para almacenar las respuestas seleccionadas
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState(Array(preguntas.length).fill(0));

  // Manejar cambios en las respuestas
  const handleChange = (index, value) => {
    const nuevasRespuestas = [...respuestasSeleccionadas];
    nuevasRespuestas[index] = value;
    setRespuestasSeleccionadas(nuevasRespuestas);
  };

  // Calcular el puntaje total
  const calcularTotal = () => {
    return respuestasSeleccionadas.reduce((a, b) => a + b, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test sobre la carga del cuidador (Zarit y Zarit)</h2>
      <form>
        {preguntas.map((pregunta, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p>{index + 1}. {pregunta}</p>
            {respuestas.map((respuesta) => (
              <label key={respuesta.value} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name={`pregunta-${index}`}
                  value={respuesta.value}
                  checked={respuestasSeleccionadas[index] === respuesta.value}
                  onChange={() => handleChange(index, respuesta.value)}
                />
                {respuesta.label}
              </label>
            ))}
          </div>
        ))}
      </form>
      <h3>Total: {calcularTotal()}</h3>
    </div>
  );
};

export default ZaritSurvey;
