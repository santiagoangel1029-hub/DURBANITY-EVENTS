let productos = [];

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");

/* ======================
   CARGA PRODUCTOS
====================== */

fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        contenedor.innerHTML = "";
    });

/* ======================
   MENÚ PRODUCTOS
====================== */

function toggleMenu() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

/* ======================
   FILTRAR
====================== */

function filtrar(categoria) {

    const filtrados = productos.filter(p => p.categoria === categoria);

    mostrar(filtrados);
}

/* ======================
   MOSTRAR PRODUCTOS
====================== */

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

/* ======================
   BUSCADOR
====================== */

buscador.addEventListener("input", (e) => {

    const texto = e.target.value.toLowerCase();

    if (texto === "") {
        contenedor.innerHTML = "";
        sugerencias.style.display = "none";
        return;
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrar(filtrados);

    sugerencias.innerHTML = filtrados.slice(0, 5).map(p => `
        <div class="sugerencia-item">${p.nombre}</div>
    `).join("");

    sugerencias.style.display = "block";
});

/* ======================
   CLICK SUGERENCIAS
====================== */

sugerencias.addEventListener("click", (e) => {

    if (e.target.classList.contains("sugerencia-item")) {

        buscador.value = e.target.innerText;

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(buscador.value.toLowerCase())
        );

        mostrar(filtrados);

        sugerencias.style.display = "none";
    }
});

/* ======================
   ENTER BUSCADOR
====================== */

buscador.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const texto = buscador.value.toLowerCase();

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );

        mostrar(filtrados);

        sugerencias.style.display = "none";
    }
});

/* ======================
   SCROLL HERO
====================== */

function scrollCatalogo() {
    window.scrollTo({
        top: 700,
        behavior: "smooth"
    });
}
