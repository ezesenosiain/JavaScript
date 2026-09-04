const btnCarrito = document.getElementById("btnCarrito");
const seccionCarrito = document.getElementById("seccionCarrito");
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

// Lleva al usuario directamente hasta el carrito
btnCarrito.addEventListener("click", () => {
    seccionCarrito.scrollIntoView({
        behavior: "smooth"
    });
});

// Finaliza la compra y limpia el carrito
btnFinalizarCompra.addEventListener("click", async () => {

    try {

        if (carrito.length === 0) {
            throw new Error("El carrito está vacío.");
        }

        const total = carrito.reduce((acumulador, producto) => {
            return acumulador + producto.precio * producto.cantidad;
        }, 0);

        const nombreCliente = "Cliente";
        const mensaje = nombreCliente || "Cliente";

        const confirmacion = await Swal.fire({
            title: "¿Confirmar compra?",
            text: `El total de tu compra es $${total.toLocaleString("es-AR")}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirmar compra",
            cancelButtonText: "Seguir comprando"
        });

        if (confirmacion.isConfirmed) {

            localStorage.removeItem("carrito");
            carrito = [];

            renderizarCarrito();

            Swal.fire({
                icon: "success",
                title: `¡Compra realizada, ${mensaje}!`,
                text: `Total abonado: $${total.toLocaleString("es-AR")}`,
                confirmButtonText: "Aceptar"
            });

        }

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "No se pudo realizar la compra",
            text: error.message
        });

    } finally {

        actualizarTotal();

    }

});