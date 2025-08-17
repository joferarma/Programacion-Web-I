import React, { useState } from "react";

function App() {
  const [monto, setMonto] = useState("");
  const [porcentaje, setPorcentaje] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const calcularPropina = () => {
    if (!monto || monto <= 0) {
      setError("Por favor ingrese un monto válido mayor a 0.");
      setResultado(null);
      return;
    }
    if (!porcentaje) {
      setError("Seleccione un porcentaje de propina.");
      setResultado(null);
      return;
    }

    setError(null);
    const propina = (monto * porcentaje) / 100;
    const total = parseFloat(monto) + propina;
    setResultado({ propina, total });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">💰 Calculadora de Propinas</h1>

      <div className="card p-4 shadow">
        {/* Input monto */}
        <div className="mb-3">
          <label className="form-label">Monto de la cuenta</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese el monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        {/* Selección porcentaje */}
        <div className="mb-3">
          <label className="form-label">Seleccione el porcentaje de propina</label>
          <div className="d-flex gap-3">
            {[10, 15, 20].map((p) => (
              <button
                key={p}
                className={`btn ${
                  porcentaje === p ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setPorcentaje(p)}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        {/* Botón calcular */}
        <div className="mb-3 text-center">
          <button className="btn btn-primary w-100" onClick={calcularPropina}>
            Calcular
          </button>
        </div>

        {/* Alertas */}
        {error && <div className="alert alert-danger">{error}</div>}
        {resultado && (
          <div className="alert alert-success">
            <h5>Resultados</h5>
            <p>Propina: <strong>L. {resultado.propina.toFixed(2)}</strong></p>
            <p>Total a pagar: <strong>L. {resultado.total.toFixed(2)}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
