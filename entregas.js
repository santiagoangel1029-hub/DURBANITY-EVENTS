let productos = [];
let pedido = [];
let productoSeleccionado = null;

document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("buscador");
    const sugerencias = document.getElementById("sugerencias");

    /* ======================
       CARGA PRODUCTOS
    ====================== */

    fetch("./productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data || [];
            console.log("✔ Productos cargados:", productos.length);
        })
        .catch(err => console.error("Error cargando productos:", err));

    /* ======================
       BUSCADOR SEGURO
    ====================== */

    buscador.addEventListener("input", () => {

        const texto = buscador.value.toLowerCase().trim();

        if (!texto) {
            sugerencias.style.display = "none";
            sugerencias.innerHTML = "";
            return;
        }

        if (!productos.length) return;

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );

        if (filtrados.length === 0) {
            sugerencias.innerHTML = "<div class='sugerencia-item'>Sin resultados</div>";
            sugerencias.style.display = "block";
            return;
        }

        sugerencias.innerHTML = filtrados.slice(0, 8).map(p => `
            <div class="sugerencia-item" onclick="seleccionarProducto(${p.id})">
                ${p.nombre}
            </div>
        `).join("");

        sugerencias.style.display = "block";
    });

});
