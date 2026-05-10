let productos = [];
let carrito = [];

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");

// CARGAR PRODUCTOS
fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        contenedor.innerHTML = "";
    });

/* ======================
   BUSCADOR
====================== */

buscador.addEventListener("input", (e) => {

    const texto = e.target.value.toLowerCase();

    if (texto === "") {
        contenedor.innerHTML = "";
        sugerencias.style.display = "none";
        return;
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrar(filtrados);

    sugerencias.innerHTML = filtrados.slice(0, 5).map(p => `
        <div class="sugerencia-item">${p.nombre}</div>
    `).join("");

    sugerencias.style.display = "block";
});

/* ======================
   ENTER BUSCADOR
====================== */

buscador.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const texto = buscador.value.toLowerCase();

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );

        mostrar(filtrados);
        sugerencias.style.display = "none";
    }
});

/* ======================
   CLICK SUGERENCIAS
====================== */

sugerencias.addEventListener("click", (e) => {

    if (e.target.classList.contains("sugerencia-item")) {

        buscador.value = e.target.innerText;

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(buscador.value.toLowerCase())
        );

        mostrar(filtrados);
        sugerencias.style.display = "none";
    }
});

/* ======================
   FILTROS
====================== */

function filtrar(categoria) {

    const filtrados = productos.filter(p => p.categoria === categoria);

    mostrar(filtrados);
}

/* ======================
   MOSTRAR PRODUCTOS
====================== */

function mostrar(lista) {

    contenedor.innerHTML = "";

    lista.forEach(p => {

        contenedor.innerHTML += `
            <div class="card">
                <img src="${p.imagen}" loading="lazy">
                <h3>${p.nombre}</h3>

                <button onclick="agregarAlPedido(${p.id})">
                    Añadir al pedido
                </button>
            </div>
        `;
    });
}

/* ======================
   PEDIDOS (CARRITO)
====================== */

function agregarAlPedido(id) {

    const producto = productos.find(p => p.id === id);

    carrito.push(producto);

    console.log("Carrito:", carrito);
}

/* ======================
   MENÚ PRODUCTOS
====================== */

function toggleMenu() {

    document.getElementById("dropdownMenu")
        .classList.toggle("show");
}

/* ======================
   MENÚ PEDIDOS
====================== */

function togglePedidos() {

    document.getElementById("dropdownPedidos")
        .classList.toggle("show");
}

/* ======================
   SCROLL HERO
====================== */

function scrollCatalogo() {

    window.scrollTo({
        top: 700,
        behavior: "smooth"
    });
}
