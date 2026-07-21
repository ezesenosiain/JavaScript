class CuentaBancaria {

    constructor(titular, numeroCuenta, saldo, movimientos) {
        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
        this.movimientos = movimientos;
    }

    depositar(monto) {
        this.saldo += monto;
    }

    retirar(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            return true;
        }
        return false;
    }

}

const cuenta1 = new CuentaBancaria(
    "Juan",
    1001,
    1000,
    ["Saldo inicial"]
);

const cuenta2 = new CuentaBancaria(
    "María",
    1002,
    2500,
    ["Saldo inicial"]
);

const cuenta3 = new CuentaBancaria(
    "Pedro",
    1003,
    500,
    ["Saldo inicial"]
);

let opcion = "";

function mostrarSaldo(cuenta) {
    alert("Su saldo es: $" + cuenta.saldo);
}

const agregarMovimiento = (cuenta, movimiento) => {
    cuenta.movimientos.push(movimiento);
};

function mostrarHistorial(cuenta) {

    let buscar = prompt(
        "Ingrese un movimiento para buscar.\nEjemplo: Consulta de saldo"
    );

    if (cuenta.movimientos.includes(buscar)) {

        let posicion = cuenta.movimientos.indexOf(buscar);

        alert("El movimiento existe y está en la posición " + posicion);

        cuenta.movimientos.splice(posicion, 1, buscar + " (revisado)");

    } else {

        alert("Ese movimiento no existe.");

    }

    let eliminado = cuenta.movimientos.pop();

    alert("Se eliminó el último movimiento: " + eliminado);

    cuenta.movimientos.unshift("Historial actualizado");

    console.log("Historial de movimientos");

    for (let movimiento of cuenta.movimientos) {
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

        mostrarSaldo(cuenta1);
        agregarMovimiento(cuenta1, "Consulta de saldo");

    } else if (opcion === "2") {

        let deposito = Number(prompt("Ingrese el monto a depositar"));

        cuenta1.depositar(deposito);
        agregarMovimiento(cuenta1, "Depósito de $" + deposito);

        alert("Depósito realizado.");

    } else if (opcion === "3") {

        let retiro = Number(prompt("Ingrese el monto a retirar"));

        if (cuenta1.retirar(retiro)) {

            agregarMovimiento(cuenta1, "Retiro de $" + retiro);

            alert("Retiro realizado.");

        } else {

            alert("Saldo insuficiente.");

        }

    } else if (opcion === "4") {

        mostrarHistorial(cuenta1);

    } else if (opcion === "5") {

        alert("Gracias por utilizar el cajero.");

    } else {

        alert("Opción inválida.");

    }

}