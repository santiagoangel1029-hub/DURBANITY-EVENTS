let productos = [];

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");

// Cargar datos
fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        contenedor.innerHTML = ""; // NO mostrar nada al inicio
    });

// 🔎 BUSCADOR (muestra solo si hay texto)
buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    if (texto === "") {
        contenedor.innerHTML = "";
        return;
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrar(filtrados);
});

// 📦 FILTRO POR CATEGORÍA
function filtrar(categoria) {

    if (categoria === "todos") {
        contenedor.innerHTML = "";
        return;
    }

    const filtrados = productos.filter(p => p.categoria === categoria);

    mostrar(filtrados);
}

// 🖼️ MOSTRAR PRODUCTOS
function mostrar(lista) {
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="${p.imagen}" loading="lazy">
                <h3>${p.nombre}</h3>
            </div>
        `;
    });
}
// ABRIR / CERRAR MENÚ
function toggleMenu() {

    const menu = document.getElementById("dropdownMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function scrollCatalogo() {

    window.scrollTo({
        top: 700,
        behavior: "smooth"
    });
}
function scrollCatalogo() {

    window.scrollTo({
        top: 700,
        behavior: "smooth"
    });
}
