let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedorCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

// Guarda el carrito actualizado en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agrega un producto al carrito o aumenta su cantidad
function agregarAlCarrito(producto) {

    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();
    renderizarCarrito();

    Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: producto.nombre,
        timer: 1200,
        showConfirmButton: false
    });
}

// Muestra los productos que están en el carrito
function renderizarCarrito() {

    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        actualizarTotal();
        return;
    }

    carrito.forEach(producto => {

        const { id, nombre, precio, cantidad } = producto;

        contenedorCarrito.innerHTML += `
            <div class="item-carrito">
                <div>
                    <h3>${nombre}</h3>
                    <p>$${precio.toLocaleString("es-AR")}</p>
                </div>

                <div class="cantidad">
                    <button class="btnRestar" data-id="${id}">-</button>
                    <span>${cantidad}</span>
                    <button class="btnSumar" data-id="${id}">+</button>
                </div>

                <p>$${(precio * cantidad).toLocaleString("es-AR")}</p>

                <button class="btnEliminar" data-id="${id}">
                    Eliminar
                </button>
            </div>
        `;

    });

    agregarEventosCarrito();
    actualizarTotal();
}

// Agrega los eventos a los botones del carrito
function agregarEventosCarrito() {

    document.querySelectorAll(".btnSumar").forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);
            const producto = carrito.find(item => item.id === id);

            producto.cantidad++;

            guardarCarrito();
            renderizarCarrito();

        });

    });

    document.querySelectorAll(".btnRestar").forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);
            const producto = carrito.find(item => item.id === id);

            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito = carrito.filter(item => item.id !== id);
            }

            guardarCarrito();
            renderizarCarrito();

        });

    });

    document.querySelectorAll(".btnEliminar").forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);

            carrito = carrito.filter(item => item.id !== id);

            guardarCarrito();
            renderizarCarrito();

            Swal.fire({
                icon: "info",
                title: "Producto eliminado",
                timer: 1000,
                showConfirmButton: false
            });

        });

    });

}

// Calcula el total del carrito
function actualizarTotal() {

    const total = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio * producto.cantidad;
    }, 0);

    totalCarrito.textContent = "$" + total.toLocaleString("es-AR");

    const cantidadProductos = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.cantidad;
    }, 0);

    contadorCarrito.textContent = cantidadProductos;
}

// Vacía todo el carrito
btnVaciarCarrito.addEventListener("click", async () => {

    if (carrito.length === 0) {
        return;
    }

    const resultado = await Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se eliminarán todos los productos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    });

    if (resultado.isConfirmed) {

        carrito = [];

        localStorage.removeItem("carrito");

        renderizarCarrito();

        Swal.fire({
            icon: "success",
            title: "Carrito vacío",
            timer: 1000,
            showConfirmButton: false
        });

    }

});

renderizarCarrito();