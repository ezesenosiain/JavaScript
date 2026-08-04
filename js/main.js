class CuentaBancaria {

    constructor(titular, numeroCuenta, saldo, movimientos) {
        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
        this.movimientos = movimientos;
    }

    depositar(monto) {
        this.saldo += monto;
        this.movimientos.push("Depósito de $" + monto);
    }

    retirar(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            this.movimientos.push("Retiro de $" + monto);
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

const cuentas = [cuenta1, cuenta2, cuenta3];

const saldo = document.getElementById("saldo");
const inputDepositar = document.getElementById("inputDepositar");
const btnDepositar = document.getElementById("btnDepositar");
const inputRetirar = document.getElementById("inputRetirar");
const btnRetirar = document.getElementById("btnRetirar");
const inputBuscar = document.getElementById("inputBuscar");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");
const listaMovimientos = document.getElementById("listaMovimientos");
const btnEstadisticas = document.getElementById("btnEstadisticas");
const informacionBanco = document.getElementById("informacionBanco");
const mensaje = document.getElementById("mensaje");

function actualizarSaldo() {
    saldo.textContent = "$" + cuenta1.saldo;
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

function renderizarMovimientos() {

    listaMovimientos.innerHTML = "";

    cuenta1.movimientos.forEach((movimiento, index) => {

        listaMovimientos.innerHTML += `
            <div class="movimiento">
                <span>${movimiento}</span>
                <button class="btnEliminar" data-index="${index}">
                    Eliminar
                </button>
            </div>
        `;

    });

    const botonesEliminar = document.querySelectorAll(".btnEliminar");

    botonesEliminar.forEach(boton => {

        boton.addEventListener("click", () => {

            const indice = boton.dataset.index;

            cuenta1.movimientos.splice(indice, 1);

            renderizarMovimientos();

            mostrarMensaje("Movimiento eliminado.");

        });

    });

}

btnDepositar.addEventListener("click", () => {

    const monto = Number(inputDepositar.value);

    if (monto > 0) {

        cuenta1.depositar(monto);

        actualizarSaldo();

        renderizarMovimientos();

        mostrarMensaje("Depósito realizado.");

        inputDepositar.value = "";

    } else {

        mostrarMensaje("Ingrese un monto válido.");

    }

});

btnRetirar.addEventListener("click", () => {

    const monto = Number(inputRetirar.value);

    if (cuenta1.retirar(monto)) {

        actualizarSaldo();

        renderizarMovimientos();

        mostrarMensaje("Retiro realizado.");

    } else {

        mostrarMensaje("Saldo insuficiente.");

    }

    inputRetirar.value = "";

});

inputBuscar.addEventListener("input", () => {

    const numero = Number(inputBuscar.value);

    const cuenta = cuentas.find(cuenta => cuenta.numeroCuenta === numero);

    if (cuenta) {

        resultadoBusqueda.innerHTML = `
            <h3>${cuenta.titular}</h3>
            <p>Cuenta: ${cuenta.numeroCuenta}</p>
            <p>Saldo: $${cuenta.saldo}</p>
        `;

    } else {

        resultadoBusqueda.innerHTML = "";

    }

});

btnEstadisticas.addEventListener("click", () => {

    const cuentasConSaldo = cuentas.filter(cuenta => cuenta.saldo > 1000);

    const totalDinero = cuentas.reduce((acumulador, cuenta) => {
        return acumulador + cuenta.saldo;
    }, 0);

    informacionBanco.innerHTML = `
        <p>Cuentas con saldo mayor a $1000: ${cuentasConSaldo.length}</p>
        <p>Dinero total del banco: $${totalDinero}</p>
    `;

});

actualizarSaldo();
renderizarMovimientos();