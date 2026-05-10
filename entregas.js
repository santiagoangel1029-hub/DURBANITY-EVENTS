window.productos = [];

document.addEventListener("DOMContentLoaded", () => {

const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");

/* ======================
   CARGA DE PRODUCTOS
====================== */

fetch("./productos.json")
.then(res => {
    if (!res.ok) throw new Error("No se pudo cargar productos.json");
    return res.json();
})
.then(data => {
    window.productos = data;
    console.log("✔ Productos cargados:", window.productos.length);
})
.catch(err => console.error("❌ Error:", err));

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

});

/* ======================
   FUNCIÓN AGREGAR (BASE)
====================== */

function agregarProducto(id) {

    const producto = window.productos.find(p => p.id === id);

    if (!producto) return;

    console.log("Producto añadido:", producto.nombre);

    // Aquí luego conectamos cantidades y formulario
}
