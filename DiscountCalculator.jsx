import React, { useState } from "react";
import Swal from "sweetalert2";

function DiscountCalculator() {
  const [productos, setProductos] = useState(Array(5).fill(""));
  const [subtotal, setSubtotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);


  const manejarCambio = (index, valor) => {
    if (!/^\d*\.?\d*$/.test(valor)) return; 
    const nuevosProductos = [...productos];
    nuevosProductos[index] = valor;
    setProductos(nuevosProductos);
  };


  const calcular = () => {
    if (productos.some((p) => p === "")) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacios",
        text: "Por favor ingresa todos los precios.",
      });
      return;
    }

    const precios = productos.map(Number);
    const nuevoSubtotal = precios.reduce((acc, curr) => acc + curr, 0);

    let porcentaje = 0;
    if (nuevoSubtotal >= 1000 && nuevoSubtotal <= 4999.99) porcentaje = 10;
    else if (nuevoSubtotal >= 5000 && nuevoSubtotal <= 8999.99) porcentaje = 20;
    else if (nuevoSubtotal >= 9000 && nuevoSubtotal <= 12999.99) porcentaje = 30;
    else if (nuevoSubtotal >= 13000) porcentaje = 40;

    const valorDescuento = (nuevoSubtotal * porcentaje) / 100;
    const totalFinal = nuevoSubtotal - valorDescuento;

    setSubtotal(nuevoSubtotal);
    setDescuento(porcentaje);
    setTotal(totalFinal);
  };

  const limpiar = () => {
    setProductos(Array(5).fill(""));
    setSubtotal(0);
    setDescuento(0);
    setTotal(0);
  };

  return (
    <div className="card shadow p-4">
      <h4 className="mb-3">Ingrese los precios de los productos</h4>

      <form>
        {productos.map((valor, i) => (
          <div className="mb-3" key={i}>
            <label className="form-label">Producto {i + 1} (L):</label>
            <input
              type="text"
              className="form-control"
              value={valor}
              onChange={(e) => manejarCambio(i, e.target.value)}
              placeholder="Ej. 250.00"
            />
          </div>
        ))}
      </form>

      <div className="d-flex gap-2 mt-3">
        <button type="button" className="btn btn-success" onClick={calcular}>
          Calcular
        </button>
        <button type="button" className="btn btn-secondary" onClick={limpiar}>
          Limpiar
        </button>
      </div>

      <hr />

      <h5 className="mt-3">Resultados:</h5>
      <p><strong>Subtotal:</strong> L{subtotal.toFixed(2)}</p>
      <p><strong>Descuento {descuento}%:</strong> L{((subtotal * descuento) / 100).toFixed(2)}</p>
      <p><strong>Total a Pagar:</strong> L{total.toFixed(2)}</p>
    </div>
  );
}

export default DiscountCalculator;
