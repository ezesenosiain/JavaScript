class CuentaBancaria {

    constructor(titular, numeroCuenta, saldo, movimientos) {
        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
        this.movimientos = movimientos;
    }

    // Función para depositar dinero y agregar el movimiento al historial
    depositar(monto) {
        this.saldo += monto;
        this.movimientos.push("Depósito de $" + monto);
    }

    // Función para retirar dinero si hay saldo suficiente
    retirar(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            this.movimientos.push("Retiro de $" + monto);
            return true;
        }
        return false;
    }
}

// Recupero la cuenta guardada en localStorage o creo una nueva si no existe
const cuentaGuardada = JSON.parse(localStorage.getItem("cuenta1")) ?? null;

const cuenta1 = cuentaGuardada
    ? new CuentaBancaria(
        cuentaGuardada.titular,
        cuentaGuardada.numeroCuenta,
        cuentaGuardada.saldo,
        cuentaGuardada.movimientos
    )
    : new CuentaBancaria(
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

// Selecciono los elementos del HTML que voy a utilizar
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

// Función para guardar los datos actualizados de la cuenta en localStorage
function guardarCuenta() {

    try {

        mensaje.textContent = "Guardando información...";

        const cuentaEnTexto = JSON.stringify(cuenta1);

        localStorage.setItem("cuenta1", cuentaEnTexto);

    } catch (error) {

        mensaje.textContent = "No se pudo guardar la información.";

    } finally {

        setTimeout(() => {
            mensaje.textContent = "";
        }, 2000);

    }

}

// Función para mostrar el saldo actualizado en pantalla
function actualizarSaldo() {
    saldo.textContent = "$" + cuenta1.saldo;
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

// Función para mostrar todos los movimientos de la cuenta
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

            guardarCuenta();
            renderizarMovimientos();

            mostrarMensaje("Movimiento eliminado.");

        });

    });

}

// Evento para realizar un depósito
btnDepositar.addEventListener("click", () => {

    const monto = Number(inputDepositar.value);

    if (monto > 0) {

        cuenta1.depositar(monto);

        guardarCuenta();
        actualizarSaldo();
        renderizarMovimientos();

        mostrarMensaje("Depósito realizado.");

        inputDepositar.value = "";

    } else {

        mostrarMensaje("Ingrese un monto válido.");

    }

});

// Evento para realizar un retiro
btnRetirar.addEventListener("click", () => {

    const monto = Number(inputRetirar.value);

    if (cuenta1.retirar(monto)) {

        guardarCuenta();
        actualizarSaldo();
        renderizarMovimientos();

        mostrarMensaje("Retiro realizado.");

    } else {

        mostrarMensaje("Saldo insuficiente.");

    }

    inputRetirar.value = "";

});

// Evento que busca una cuenta mientras se escribe su número
inputBuscar.addEventListener("input", () => {

    const numero = Number(inputBuscar.value);

    const cuenta = cuentas.find(cuenta => cuenta.numeroCuenta === numero);

    if (cuenta) {

        const { titular, numeroCuenta, saldo } = cuenta;

        const estadoSaldo = saldo > 0 ? "Saldo disponible" : "Sin saldo";

        resultadoBusqueda.innerHTML = `
            <h3>${titular}</h3>
            <p>Cuenta: ${numeroCuenta}</p>
            <p>Saldo: $${saldo}</p>
            <p>${estadoSaldo}</p>
        `;

    } else {

        resultadoBusqueda.innerHTML = "";

    }

});

// Evento que muestra información general de las cuentas
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

// Mensaje que aparece unos segundos después de ingresar al simulador
setTimeout(() => {

    mostrarMensaje("Recordatorio: revisá tu saldo antes de realizar una operación.");

    setTimeout(() => {
        mensaje.textContent = "";
    }, 4000);

}, 3000);

// Muestro los datos iniciales al cargar la página
actualizarSaldo();
renderizarMovimientos();