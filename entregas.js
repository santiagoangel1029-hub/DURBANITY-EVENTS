window.productos = [];
window.seleccionados = [];

let buscador, catalogo, seleccionados, btnAceptar;

document.addEventListener("DOMContentLoaded", () => {

    buscador = document.getElementById("buscador");
    catalogo = document.getElementById("catalogoBusqueda");
    seleccionados = document.getElementById("seleccionados");
    btnAceptar = document.getElementById("btnAceptar");

    /* CARGAR PRODUCTOS */
    fetch("./productos.json")
        .then(res => res.json())
        .then(data => {
            window.productos = data;
            renderProductos(window.productos);
        });

    /* BUSCADOR */
    buscador.addEventListener("input", (e) => {

        const texto = e.target.value.toLowerCase().trim();

        if (!texto) {
            renderProductos(window.productos);
            return;
        }

        const filtrados = window.productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );

        renderProductos(filtrados);
    });
});

/* ======================
   RENDER PRODUCTOS
====================== */

function renderProductos(lista) {

    if (!catalogo) return;

    catalogo.innerHTML = lista.map(p => `
        <div class="card" onclick="agregarProducto(${p.id})" style="cursor:pointer;">
            <img src="${p.imagen}" loading="lazy">
            <h3>${p.nombre}</h3>
        </div>
    `).join("");
}

/* ======================
   AGREGAR PRODUCTO
====================== */

function agregarProducto(id) {

    const producto = window.productos.find(p => p.id === id);

    if (!producto) return;

    window.seleccionados.push(producto);

    renderSeleccionados();

    btnAceptar.classList.remove("oculto");
}

/* ======================
   SELECCIONADOS
====================== */

function renderSeleccionados() {

    if (!seleccionados) return;

    seleccionados.innerHTML = window.seleccionados.map(p => `
        <div class="card">
            <img src="${p.imagen}">
            <h3>${p.nombre}</h3>
        </div>
    `).join("");
}

/* ======================
   TOGGLE SEARCH
====================== */

function toggleSearch() {
    document.getElementById("searchBox").classList.toggle("active");
}

/* ======================
   PASO 2
====================== */

function irPaso2() {
    document.getElementById("paso1").classList.add("oculto");
    document.getElementById("paso2").classList.remove("oculto");
}

/* ======================
   GUARDAR PEDIDO
====================== */

function guardarPedido() {

    const pedido = {
        cliente: document.getElementById("cliente").value,
        entrega: document.getElementById("dirEntrega").value,
        recogida: document.getElementById("dirRecogida").value,
        fechaEntrega: document.getElementById("fechaEntrega").value,
        fechaRecogida: document.getElementById("fechaRecogida").value,
        productos: window.seleccionados
    };

    let data = JSON.parse(localStorage.getItem("entregas")) || [];

    data.push(pedido);

    localStorage.setItem("entregas", JSON.stringify(data));

    alert("Pedido guardado");

    location.reload();
}

/* ======================
   ENTREGAS PENDIENTES
====================== */

function toggleEntregas() {

    const panel = document.getElementById("entregasPanel");

    const data = JSON.parse(localStorage.getItem("entregas")) || [];

    panel.innerHTML = data.map(p => `
        <div class="card">
            <h3>${p.cliente}</h3>
            <p>${p.entrega}</p>
        </div>
    `).join("");

    panel.classList.toggle("oculto");
}
