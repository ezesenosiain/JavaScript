const anio_actual = 2026;

let nombre = prompt("Ingrese su nombre:");
let apellido = prompt("Ingrese su apellido:");
let anio_nac = prompt("Ingrese su año de nacimiento:");

let anio_parseado = parseInt(anio_nac);

if (!isNaN(anio_parseado)) {
    let edad = anio_actual - anio_parseado;
    let mensaje = `Hola ${nombre} ${apellido}, tu edad es ${edad} años.`;
    alert(mensaje);
} else {
    alert("Por favor, ingrese un año válido.");
}