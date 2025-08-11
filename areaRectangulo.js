//Funcion para calcular el area
function calcularArea() {
    const base = document.getElementById("base").value.trim();
    const altura = document.getElementById("altura").value.trim();

    //Validaciones
    if (base === "" || altura === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos vacios',
            text: 'Por favor, ingrese la base y la altura.',
        });
        return;
    }

    if (isNaN(base) || isNaN(altura)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no numerico',
            text: 'La base y la altura deben ser numeros validos.',
        });
        return;
    }

    const baseNum = parseFloat(base);
    const alturaNum = parseFloat(altura);

    if (baseNum <= 0 || alturaNum <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Numero invalido',
            text: 'Los valores deben ser positivos.',
        });
        return;
    }

    const area = baseNum * alturaNum;
    document.getElementById("resultado").value = area.toFixed(2);

    Swal.fire({
        icon: 'success',
        title: 'Cálculo exitoso',
        text: `El area del rectangulo es ${area.toFixed(2)}`,
    });
}

//Funcion para limpiar los campos
function limpiarCampos() {
    document.getElementById("formRectangulo").reset();
    document.getElementById("resultado").value = "";
}

//Eventos de botones
document.getElementById("btnCalcular").addEventListener("click", calcularArea);
document.getElementById("btnLimpiar").addEventListener("click", limpiarCampos);
