// Clase que representa una cuenta bancaria
class CuentaBancaria {

    constructor(titular, numeroCuenta, saldo, movimientos) {
        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
        this.movimientos = movimientos;
    }

    // Método para realizar un depósito
    depositar(monto) {
        this.saldo += monto;
    }

    // Método para realizar un retiro si hay saldo suficiente
    retirar(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            return true;
        }
        return false;
    }

}

// Creación de las cuentas bancarias
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

// Array que almacena todas las cuentas del banco
const cuentas = [cuenta1, cuenta2, cuenta3];

// Variable para controlar el menú principal
let opcion = "";

// Muestra el saldo de una cuenta
function mostrarSaldo(cuenta) {
    alert("Su saldo es: $" + cuenta.saldo);
}

// Agrega un movimiento al historial de una cuenta
const agregarMovimiento = (cuenta, movimiento) => {
    cuenta.movimientos.push(movimiento);
};

// Permite consultar y modificar el historial de movimientos
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

    console.log("Historial de movimientos:");

    for (let movimiento of cuenta.movimientos) {
        console.log(movimiento);
    }

}

// Utiliza funciones de orden superior sobre el array de cuentas
function mostrarInformacionBanco() {

    let numero = Number(prompt("Ingrese el número de cuenta que desea buscar:"));

    let cuentaEncontrada = cuentas.find(cuenta => cuenta.numeroCuenta === numero);

    if (cuentaEncontrada) {
        console.log("Cuenta encontrada:");
        console.log(cuentaEncontrada);
    } else {
        console.log("Cuenta no encontrada.");
    }

    let monto = Number(prompt("Mostrar cuentas con saldo mayor a:"));

    let cuentasConSaldo = cuentas.filter(cuenta => cuenta.saldo > monto);

    console.log("Cuentas con saldo mayor a $" + monto + ":");
    console.log(cuentasConSaldo);

    let totalDinero = cuentas.reduce((acumulador, cuenta) => {
        return acumulador + cuenta.saldo;
    }, 0);

    console.log("Dinero total del banco: $" + totalDinero);

}

alert("Bienvenido al Cajero Automático");

// Menú principal del simulador
while (opcion !== "6") {

    opcion = prompt(
        "Seleccione una opción:\n\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Ver historial\n" +
        "5 - Información del banco\n" +
        "6 - Salir"
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

        mostrarInformacionBanco();

    } else if (opcion === "6") {

        alert("Gracias por utilizar el cajero.");

    } else {

        alert("Opción inválida.");

    }

}