document.addEventListener("DOMContentLoaded", () => {
    const nota1 = document.getElementById("nota1");
    const nota2 = document.getElementById("nota2");
    const nota3 = document.getElementById("nota3");
    const btnCalcular = document.getElementById("btnCalcular");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const resultado = document.getElementById("resultado");
    const mensaje = document.getElementById("mensaje");

    btnCalcular.addEventListener("click", () => {
        let n1 = parseFloat(nota1.value);
        let n2 = parseFloat(nota2.value);
        let n3 = parseFloat(nota3.value);

        //Validaciones
        if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            return Swal.fire("Error", "Todos los campos son obligatorios y deben ser numeros.", "error");
        }
        if (n1 < 0 || n1 > 30) {
            return Swal.fire("Error", "La nota del Primer parcial debe estar entre 0 y 30.", "error");
        }
        if (n2 < 0 || n2 > 30) {
            return Swal.fire("Error", "La nota del Segundo parcial debe estar entre 0 y 30.", "error");
        }
        if (n3 < 0 || n3 > 40) {
            return Swal.fire("Error", "La nota del Tercer parcial debe estar entre 0 y 40.", "error");
        }

        let total = n1 + n2 + n3;
        resultado.textContent = total;

        //Mensajes
        if (total >= 0 && total <= 59) {
            mensaje.textContent = "Reprobado";
            mensaje.classList.replace("text-success", "text-danger");
        } else if (total >= 60 && total <= 79) {
            mensaje.textContent = "Bueno";
            mensaje.classList.replace("text-danger", "text-success");
        } else if (total >= 80 && total <= 89) {
            mensaje.textContent = "Muy Bueno";
            mensaje.classList.replace("text-danger", "text-success");
        } else if (total >= 90 && total <= 100) {
            mensaje.textContent = "Sobresaliente";
            mensaje.classList.replace("text-danger", "text-success");
        }

        //Notificacion
        Swal.fire("Calculo Exitoso", "La nota final ha sido calculada correctamente.", "success");
    });

    btnLimpiar.addEventListener("click", () => {
        nota1.value = "";
        nota2.value = "";
        nota3.value = "";
        resultado.textContent = "---";
        mensaje.textContent = "";
        Swal.fire("Formulario Limpio", "Todos los campos han sido borrados.", "info");
    });
});
