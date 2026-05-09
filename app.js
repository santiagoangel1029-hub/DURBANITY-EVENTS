let productos = [];

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");

fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        renderSecciones(productos);
    });

// BUSCADOR
buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    renderSecciones(filtrados);
});

// AGRUPAR POR CATEGORÍA
function renderSecciones(lista) {
    contenedor.innerHTML = "";

    const categorias = [...new Set(lista.map(p => p.categoria))];

    categorias.forEach(cat => {

        const productosCat = lista.filter(p => p.categoria === cat);

        contenedor.innerHTML += `
            <h2 class="titulo-categoria">${formatear(cat)}</h2>
            <div class="grid">
                ${productosCat.map(p => `
                    <div class="card">
                        <img src="${p.imagen}" loading="lazy">
                        <h3>${p.nombre}</h3>
                    </div>
                `).join("")}
            </div>
        `;
    });
}

// FORMATEAR TEXTO BONITO
function formatear(texto) {
    return texto
        .replace(/-/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}
