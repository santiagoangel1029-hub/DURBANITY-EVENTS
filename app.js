let productos = [];

fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrar(productos);
    });

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

// FILTRO POR CATEGORÍA
function filtrar(categoria) {
    if (categoria === "todos") {
        mostrar(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        mostrar(filtrados);
    }
}

// BUSCADOR (se mantiene)
buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrar(filtrados);
});
