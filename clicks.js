import React, { useEffect, useMemo, useState } from "react"

const MAX = 9999
const MIN = 0

function Alert({ variant = "info", message, onClose }) {
  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show`}
      role="alert"
    >
      <span>{message}</span>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  )
}

export default function App() {
  const [count, setCount] = useState(0)
  const [alerts, setAlerts] = useState([])
  const [inputValue, setInputValue] = useState("")

  // Auto-cierre de alertas
  useEffect(() => {
    if (alerts.length === 0) return
    const timers = alerts.map((a) =>
      setTimeout(() => dismissAlert(a.id), a.timeout || 4000)
    )
    return () => timers.forEach(clearTimeout)
  }, [alerts])

  const addAlert = (msg, variant = "warning", timeout = 4000) => {
    const id = crypto.randomUUID()
    setAlerts((prev) => [...prev, { id, msg, variant, timeout }])
  }

  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const canDecrement = count > MIN
  const canIncrement = count < MAX

  const handleIncrement = () => {
    if (!canIncrement) {
      addAlert(`Has alcanzado el máximo permitido (${MAX}).`, "danger")
      return
    }
    setCount((c) => c + 1)
  }

  const handleDecrement = () => {
    if (!canDecrement) {
      addAlert("El contador no puede ser negativo.", "danger")
      return
    }
    setCount((c) => c - 1)
  }

  const handleReset = () => {
    if (count === 0) {
      addAlert("El contador ya está en cero.", "info")
      return
    }
    setCount(0)
    addAlert("Contador reiniciado a 0.", "success")
  }

  const handleSet = (e) => {
    e.preventDefault()
    const trimmed = String(inputValue).trim()
    if (trimmed === "") {
      addAlert("Ingrese un número para establecer el contador.", "warning")
      return
    }
    const parsed = Number(trimmed)
    if (!Number.isInteger(parsed)) {
      addAlert("Solo se permiten enteros.", "warning")
      return
    }
    if (parsed < MIN || parsed > MAX) {
      addAlert(`El valor debe estar entre ${MIN} y ${MAX}.`, "warning")
      return
    }
    setCount(parsed)
    addAlert(`Contador establecido a ${parsed}.`, "success")
    setInputValue("")
  }

  const progress = useMemo(() => Math.round((count / MAX) * 100), [count])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h4 mb-0">Contador para Observaciones</h1>
                <span className="badge text-bg-secondary">MAX {MAX}</span>
              </div>

              {/* Alertas */}
              <div aria-live="polite" aria-atomic="true">
                {alerts.map((a) => (
                  <Alert
                    key={a.id}
                    variant={a.variant}
                    message={a.msg}
                    onClose={() => dismissAlert(a.id)}
                  />
                ))}
              </div>

              {/* Display */}
              <div className="text-center my-4">
                <div className="display-3 fw-bold counter-display">{count}</div>
                <div
                  className="progress mt-3"
                  role="progressbar"
                  aria-label="Progreso del conteo"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <small className="text-muted">
                  Progreso relativo al máximo
                </small>
              </div>

              {/* Controles */}
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center my-3">
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={handleDecrement}
                  disabled={!canDecrement}
                >
                  − Disminuir
                </button>
                <button
                  className="btn btn-primary px-4"
                  onClick={handleIncrement}
                  disabled={!canIncrement}
                >
                  + Incrementar
                </button>
                <button
                  className="btn btn-warning px-4"
                  onClick={handleReset}
                >
                  Reiniciar
                </button>
              </div>

              {/* Formulario set */}
              <form className="mt-4" onSubmit={handleSet} noValidate>
                <div className="row g-2 align-items-end">
                  <div className="col-8">
                    <label htmlFor="setValue" className="form-label">
                      Establecer valor
                    </label>
                    <input
                      id="setValue"
                      type="number"
                      inputMode="numeric"
                      className="form-control"
                      placeholder={`Entre ${MIN} y ${MAX}`}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      min={MIN}
                      max={MAX}
                    />
                  </div>
                  <div className="col-4 d-grid">
                    <button type="submit" className="btn btn-success">
                      Aplicar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
