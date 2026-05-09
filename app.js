const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");

let productos = [];

// Cargar JSON (esto es lo que lo hace escalable)
fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrar(productos);
    });

// Mostrar productos
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

// Búsqueda en tiempo real
buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrar(filtrados);
});