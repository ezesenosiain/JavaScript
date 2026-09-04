let productos = [];

const contenedorProductos = document.getElementById("contenedorProductos");
const mensajeProductos = document.getElementById("mensajeProductos");
const inputBusqueda = document.getElementById("inputBusqueda");
const filtroCategoria = document.getElementById("filtroCategoria");

// Carga los productos desde el archivo JSON
async function cargarProductos() {

    try {

        mensajeProductos.textContent = "Cargando productos...";

        const respuesta = await fetch("data/productos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        productos = await respuesta.json();

        mostrarCategorias();
        renderizarProductos(productos);

    } catch (error) {

        mensajeProductos.textContent = "No se pudieron cargar los productos.";

    } finally {

        mensajeProductos.textContent = "";

    }
}

// Muestra los productos en pantalla
function renderizarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";

    if (listaProductos.length === 0) {
        mensajeProductos.textContent = "No se encontraron productos.";
        return;
    }

    listaProductos.forEach(producto => {

        const { nombre, precio, categoria, stock, imagen, id } = producto;

        contenedorProductos.innerHTML += `
            <article class="producto">
                <img src="${imagen}" alt="${nombre}">
                <h3>${nombre}</h3>
                <p>${categoria}</p>
                <p class="precio">$${precio.toLocaleString("es-AR")}</p>
                <p>Stock: ${stock}</p>
                <button class="btnAgregar" data-id="${id}">
                    Agregar al carrito
                </button>
            </article>
        `;

    });

    const botonesAgregar = document.querySelectorAll(".btnAgregar");

    botonesAgregar.forEach(boton => {

        boton.addEventListener("click", () => {

            const productoId = Number(boton.dataset.id);

            const producto = productos.find(producto => producto.id === productoId);

            if (producto) {
                agregarAlCarrito(producto);
            }

        });

    });

}

// Crea las opciones del filtro de categorías
function mostrarCategorias() {

    const categorias = productos.map(producto => producto.categoria);

    const categoriasUnicas = [...new Set(categorias)];

    categoriasUnicas.forEach(categoria => {

        filtroCategoria.innerHTML += `
            <option value="${categoria}">
                ${categoria}
            </option>
        `;

    });

}

// Filtra los productos según el texto y la categoría seleccionada
function filtrarProductos() {

    const texto = inputBusqueda.value.toLowerCase();
    const categoria = filtroCategoria.value;

    const productosFiltrados = productos.filter(producto => {

        const coincideNombre = producto.nombre.toLowerCase().includes(texto);

        const coincideCategoria =
            categoria === "todos" || producto.categoria === categoria;

        return coincideNombre && coincideCategoria;

    });

    renderizarProductos(productosFiltrados);
}

// Evento para buscar productos mientras se escribe
inputBusqueda.addEventListener("input", filtrarProductos);

// Evento para filtrar productos por categoría
filtroCategoria.addEventListener("change", filtrarProductos);

cargarProductos();