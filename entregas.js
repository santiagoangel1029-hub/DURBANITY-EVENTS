window.productos = [];
window.seleccionados = [];

/* ======================
   CARGA PRODUCTOS
====================== */

fetch("./productos.json")
.then(res => res.json())
.then(data => {
    window.productos = data;
});

/* ======================
   ELEMENTOS
====================== */

const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");
const btnAceptar = document.getElementById("btnAceptar");
const seleccionados = document.getElementById("seleccionados");

/* ======================
   BUSCADOR
====================== */

buscador.addEventListener("input", (e) => {

    const texto = e.target.value.toLowerCase().trim();

    if (!texto) {
        sugerencias.innerHTML = "";
        return;
    }

    const filtrados = window.productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    sugerencias.innerHTML = filtrados.slice(0, 8).map(p => `
        <div class="sugerencia-item" onclick="agregarProducto(${p.id})">
            ${p.nombre}
        </div>
    `).join("");
});

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
   MOSTRAR SELECCIONADOS
====================== */

function renderSeleccionados() {

    seleccionados.innerHTML = window.seleccionados.map(p => `
        <div class="card">
            <h3>${p.nombre}</h3>
        </div>
    `).join("");
}

/* ======================
   TOGGLE SEARCH (IMPORTANTE)
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

    let guardados = JSON.parse(localStorage.getItem("entregas")) || [];

    guardados.push(pedido);

    localStorage.setItem("entregas", JSON.stringify(guardados));

    alert("Pedido guardado correctamente");

    location.reload();
}

/* ======================
   ENTREGAS PENDIENTES
====================== */

function toggleEntregas() {

    const panel = document.getElementById("entregasPanel");

    const datos = JSON.parse(localStorage.getItem("entregas")) || [];

    panel.innerHTML = datos.map((p, i) => `
        <div class="card">
            <h3>${p.cliente}</h3>
            <p>${p.entrega}</p>
        </div>
    `).join("");

    panel.classList.toggle("oculto");
}
