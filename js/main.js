let saldo = 1000;
let opcion = "";

let movimientos = [
    "Saldo inicial",
    "Inicio de sesión",
    "Consulta de saldo",
    "Depósito",
    "Retiro"
];

// Función declarada
function mostrarSaldo(saldoActual) {
    alert("Su saldo es: $" + saldoActual);
}

// Función con return
function actualizarSaldo(saldoActual, monto, operacion) {

    if (operacion === "deposito") {
        return saldoActual + monto;
    } else {
        return saldoActual - monto;
    }

}

// Función flecha
const agregarMovimiento = (movimiento) => {
    movimientos.push(movimiento);
};

// Función para mostrar el historial
function mostrarHistorial() {

    let buscar = prompt(
        "Ingrese un movimiento para buscar.\nEjemplo: Consulta de saldo"
    );

    if (movimientos.includes(buscar)) {

        let posicion = movimientos.indexOf(buscar);

        alert("El movimiento existe y está en la posición " + posicion);

        movimientos.splice(posicion, 1, buscar + " (revisado)");

    } else {

        alert("Ese movimiento no existe.");

    }

    let eliminado = movimientos.pop();
    alert("Se eliminó el último movimiento: " + eliminado);

    movimientos.unshift("Historial actualizado");

    console.log("Historial de movimientos");

    for (let movimiento of movimientos) {
        console.log(movimiento);
    }

}

alert("Bienvenido al Cajero Automático");

while (opcion !== "5") {

    opcion = prompt(
        "Seleccione una opción:\n\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Ver historial\n" +
        "5 - Salir"
    );

    if (opcion === "1") {

        mostrarSaldo(saldo);
        agregarMovimiento("Consulta de saldo");

    } else if (opcion === "2") {

        let deposito = Number(prompt("Ingrese el monto a depositar"));

        saldo = actualizarSaldo(saldo, deposito, "deposito");

        agregarMovimiento("Depósito de $" + deposito);

        alert("Depósito realizado.");

    } else if (opcion === "3") {

        let retiro = Number(prompt("Ingrese el monto a retirar"));

        if (retiro <= saldo) {

            saldo = actualizarSaldo(saldo, retiro, "retiro");

            agregarMovimiento("Retiro de $" + retiro);

            alert("Retiro realizado.");

        } else {

            alert("Saldo insuficiente.");

        }

    } else if (opcion === "4") {

        mostrarHistorial();

    } else if (opcion === "5") {

        alert("Gracias por utilizar el cajero.");

    } else {

        alert("Opción inválida.");

    }

}