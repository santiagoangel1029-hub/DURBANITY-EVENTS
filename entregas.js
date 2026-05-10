let productos = [];
let pedido = [];
let productoSeleccionado = null;

document.addEventListener("DOMContentLoaded", () => {

const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");

/* ======================
   CARGAR PRODUCTOS
====================== */

fetch("./productos.json")
.then(r => r.json())
.then(data => {
    productos = data;
});

/* ======================
   BUSCADOR (SOLO SUGERENCIAS)
====================== */

buscador.addEventListener("input", (e) => {

    const texto = e.target.value.toLowerCase().trim();
    sugerencias.innerHTML = "";

    if (!texto) return;

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    sugerencias.innerHTML = filtrados.slice(0, 8).map(p => `
        <div onclick="seleccionarProducto(${p.id})" class="sugerencia-item">
            ${p.nombre}
        </div>
    `).join("");
});

});

/* ======================
   SELECCIONAR PRODUCTO
====================== */

function seleccionarProducto(id) {

    productoSeleccionado = productos.find(p => p.id === id);

    const box = document.getElementById("seleccionActual");

    box.classList.remove("oculto");

    box.innerHTML = `
        <h4>${productoSeleccionado.nombre}</h4>

        <input type="number" id="cantidad" min="1" value="1" class="qty">

        <button onclick="agregarPedido()" class="btn-main">
            Añadir
        </button>
    `;
}

/* ======================
   AGREGAR A PEDIDO
====================== */

function agregarPedido() {

    const cantidad = document.getElementById("cantidad").value;

    if (!productoSeleccionado) return;

    pedido.push({
        ...productoSeleccionado,
        cantidad: parseInt(cantidad)
    });

    renderPedido();

    document.getElementById("btnAceptar").classList.remove("oculto");

    document.getElementById("seleccionActual").classList.add("oculto");
}

/* ======================
   RENDER PEDIDO
====================== */

function renderPedido() {

    const cont = document.getElementById("seleccionados");

    cont.innerHTML = "";

    pedido.forEach((p, i) => {

        cont.innerHTML += `
            <div class="item">
                <span>${p.nombre} x ${p.cantidad}</span>
                <button onclick="eliminarItem(${i})">❌</button>
            </div>
        `;
    });
}

/* ======================
   ELIMINAR ITEM
====================== */

function eliminarItem(i) {
    pedido.splice(i,1);
    renderPedido();

    if (pedido.length === 0) {
        document.getElementById("btnAceptar").classList.add("oculto");
    }
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

    const cliente = document.getElementById("cliente").value;

    const pedidoFinal = {
        cliente,
        productos: pedido
    };

    let data = JSON.parse(localStorage.getItem("entregas") || "[]");

    data.push(pedidoFinal);

    localStorage.setItem("entregas", JSON.stringify(data));

    alert("Pedido guardado");

    location.reload();
}

/* ======================
   TOGGLE ENTREGAS
====================== */

function toggleEntregas() {

    const panel = document.getElementById("entregasPanel");

    panel.classList.toggle("oculto");

    let data = JSON.parse(localStorage.getItem("entregas") || "[]");

    panel.innerHTML = data.map(p => `
        <div class="panel">
            <b>${p.cliente}</b>
            <br>
            ${p.productos.map(x => `• ${x.nombre} x ${x.cantidad}`).join("<br>")}
        </div>
    `).join("");
}

/* ======================
   SEARCH UI
====================== */

function toggleSearch() {

    document.getElementById("searchBox").classList.toggle("active");
}
