let saldo = 1000;
let opcion = "";

alert("Bienvenido al Cajero Automático");

while (opcion !== "4") {

    opcion = prompt(
        "Seleccione una opción:\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Salir"
    );

    if (opcion === "1") {

        alert("Su saldo es: $" + saldo);

    } else if (opcion === "2") {

        let deposito = Number(prompt("¿Cuánto dinero desea depositar?"));

        saldo = saldo + deposito;

        alert("Depósito realizado.\nSaldo actual: $" + saldo);

    } else if (opcion === "3") {

        let retiro = Number(prompt("¿Cuánto dinero desea retirar?"));

        if (retiro <= saldo) {

            saldo = saldo - retiro;
            alert("Retiro realizado.\nSaldo actual: $" + saldo);

        } else {

            alert("No tiene saldo suficiente.");

        }

    } else if (opcion === "4") {

        alert("Gracias por utilizar el cajero.");

    } else {

        alert("Opción inválida.");

    }

}

console.log("Fin del programa");