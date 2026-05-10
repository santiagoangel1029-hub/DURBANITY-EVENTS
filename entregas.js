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
.then(res => res.json())
.then(data => {
    productos = data;
    console.log("✔ productos cargados:", productos.length);
});

/* ======================
   BUSCADOR FUNCIONAL
====================== */

buscador.addEventListener("input", (e) => {

    const texto = e.target.value.toLowerCase().trim();

    if (!texto) {
        sugerencias.style.display = "none";
        sugerencias.innerHTML = "";
        return;
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    sugerencias.innerHTML = filtrados.slice(0, 8).map(p => `
        <div class="sugerencia-item" onclick="seleccionarProducto(${p.id})">
            ${p.nombre}
        </div>
    `).join("");

    sugerencias.style.display = "block";
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

        <input type="number" id="cantidad" value="1" min="1" class="qty">

        <button class="btn-main" onclick="agregarPedido()">
            Añadir
        </button>
    `;

    document.getElementById("sugerencias").style.display = "none";
}

/* ======================
   AGREGAR AL PEDIDO
====================== */

function agregarPedido() {

    const cantidad = document.getElementById("cantidad").value;

    pedido.push({
        ...productoSeleccionado,
        cantidad: parseInt(cantidad)
    });

    renderPedido();

    document.getElementById("btnAceptar").classList.remove("oculto");

    document.getElementById("seleccionActual").classList.add("oculto");
}

/* ======================
   RENDER
====================== */

function renderPedido() {

    const cont = document.getElementById("seleccionados");

    cont.innerHTML = "";

    pedido.forEach((p,i) => {

        cont.innerHTML += `
            <div class="panel">
                ${p.nombre} x ${p.cantidad}
                <button onclick="eliminarItem(${i})">❌</button>
            </div>
        `;
    });
}

/* ======================
   ELIMINAR
====================== */

function eliminarItem(i){
    pedido.splice(i,1);
    renderPedido();

    if(pedido.length === 0){
        document.getElementById("btnAceptar").classList.add("oculto");
    }
}

/* ======================
   PASO 2
====================== */

function irPaso2(){
    document.getElementById("paso1").classList.add("oculto");
    document.getElementById("paso2").classList.remove("oculto");
}

/* ======================
   GUARDAR PEDIDO
====================== */

function guardarPedido(){

    const cliente = document.getElementById("cliente").value;

    let data = JSON.parse(localStorage.getItem("entregas") || "[]");

    data.push({
        cliente,
        productos: pedido
    });

    localStorage.setItem("entregas", JSON.stringify(data));

    alert("Pedido guardado");

    location.reload();
}

/* ======================
   MOSTRAR ENTREGAS
====================== */

function toggleEntregas(){

    const panel = document.getElementById("entregasPanel");

    panel.classList.toggle("oculto");

    let data = JSON.parse(localStorage.getItem("entregas") || "[]");

    panel.innerHTML = data.map(p => `
        <div class="panel">
            <b>${p.cliente}</b><br>
            ${p.productos.map(x => `• ${x.nombre} x ${x.cantidad}`).join("<br>")}
        </div>
    `).join("");
}

/* ======================
   BUSCADOR UI
====================== */

function toggleSearch(){
    document.getElementById("searchBox").classList.toggle("active");
}
