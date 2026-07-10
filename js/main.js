let saldo = 1000;
let opcion = "";
let movimientos = [
    "Saldo inicial",
    "Inicio de sesión",
    "Consulta de saldo",
    "Depósito",
    "Retiro"
];

alert("Bienvenido al Cajero Automático");

while (opcion !== "5") {

    opcion = prompt(
        "Seleccione una opción:\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Ver historial\n" +
        "5 - Salir"
    );

    if (opcion === "1") {

        alert("Su saldo es: $" + saldo);
        movimientos.push("Consulta de saldo");

    } else if (opcion === "2") {

        let deposito = Number(prompt("¿Cuánto dinero desea depositar?"));

        saldo += deposito;
        movimientos.push("Depósito de $" + deposito);

        alert("Depósito realizado.\nSaldo actual: $" + saldo);

    } else if (opcion === "3") {

        let retiro = Number(prompt("¿Cuánto dinero desea retirar?"));

        if (retiro <= saldo) {

            saldo -= retiro;
            movimientos.push("Retiro de $" + retiro);

            alert("Retiro realizado.\nSaldo actual: $" + saldo);

        } else {

            alert("No tiene saldo suficiente.");

        }

    } else if (opcion === "4") {

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
        alert("Se ha eliminado el último movimiento: " + eliminado);

        movimientos.unshift("Historial actualizado");

        console.log("Historial de movimientos:");

        for (let movimiento of movimientos) {
            console.log("Movimiento: " + movimiento);
        }

    } else if (opcion === "5") {

        alert("Gracias por utilizar el cajero.");

    } else {

        alert("Opción inválida.");

    }

}