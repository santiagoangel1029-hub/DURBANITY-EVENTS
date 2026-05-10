let productos = [];

/* ======================
   ELEMENTOS
====================== */

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");

/* ======================
   PEDIDOS TEMPORALES
====================== */

let hojaPedido =
    JSON.parse(localStorage.getItem("pedido")) || [];

/* ======================
   SEGURIDAD
====================== */

if (!contenedor) console.warn("No existe #contenedor");
if (!buscador) console.warn("No existe #buscador");
if (!sugerencias) console.warn("No existe #sugerencias");

/* ======================
   CARGAR PRODUCTOS
====================== */

fetch("productos.json")
    .then(res => res.json())
    .then(data => {

        productos = data || [];

        contenedor.innerHTML = "";

    })
    .catch(err => {

        console.error(
            "Error cargando productos:",
            err
        );

    });

/* ======================
   MENÚ PRODUCTOS
====================== */

function toggleMenu() {

    const menu =
        document.getElementById("dropdownMenu");

    if (!menu) return;

    menu.classList.toggle("show");
}

/* ======================
   MENÚ PEDIDOS
====================== */

function togglePedidos() {

    const menu =
        document.getElementById("dropdownPedidos");

    if (!menu) return;

    menu.classList.toggle("show");
}

/* ======================
   BUSCADOR
====================== */

function toggleSearch() {

    const box =
        document.getElementById("searchBox");

    if (!box) return;

    box.classList.toggle("active");

    if (buscador) {
        buscador.focus();
    }
}

/* ======================
   FILTRAR CATEGORÍAS
====================== */

function filtrar(categoria) {

    if (!productos.length) return;

    const filtrados = productos.filter(p =>
        p.categoria === categoria
    );

    mostrar(filtrados);
}

/* ======================
   MOSTRAR PRODUCTOS
====================== */

function mostrar(lista) {

    if (!contenedor) return;

    contenedor.innerHTML = "";

    lista.forEach(p => {

        contenedor.innerHTML += `

            <div class="card">

                <img src="${p.imagen}"
                     loading="lazy">

                <h3>${p.nombre}</h3>

                <div class="pedido-actions">

                    <input
                        type="number"
                        min="1"
                        value="1"
                        id="cantidad-${p.id || p.nombre}"
                        class="cantidad-input"
                    >

                    <button
                        class="btn-add"
                        onclick="agregarHoja('${p.id || p.nombre}')"
                    >

                        Añadir

                    </button>

                </div>

            </div>

        `;
    });
}

/* ======================
   AGREGAR A HOJA
====================== */

function agregarHoja(id) {

    const producto = productos.find(p =>
        (p.id || p.nombre) == id
    );

    if (!producto) return;

    const input =
        document.getElementById(
            `cantidad-${id}`
        );

    let cantidad = 1;

    if (input) {
        cantidad = parseInt(input.value) || 1;
    }

    hojaPedido.push({

        nombre: producto.nombre,

        cantidad: cantidad

    });

    localStorage.setItem(
        "pedido",
        JSON.stringify(hojaPedido)
    );

    alert(
        producto.nombre +
        " añadido a la hoja"
    );
}

/* ======================
   BUSCADOR EN VIVO
====================== */

if (buscador) {

    buscador.addEventListener("input", (e) => {

        const texto =
            e.target.value.toLowerCase();

        if (!texto) {

            contenedor.innerHTML = "";

            if (sugerencias) {
                sugerencias.style.display = "none";
            }

            return;
        }

        const filtrados = productos.filter(p =>
            p.nombre
             .toLowerCase()
             .includes(texto)
        );

        mostrar(filtrados);

        if (sugerencias) {

            sugerencias.innerHTML = filtrados
                .slice(0, 5)
                .map(p => `

                    <div class="sugerencia-item">

                        ${p.nombre}

                    </div>

                `)
                .join("");

            sugerencias.style.display = "block";
        }
    });

    /* ENTER */

    buscador.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            const texto =
                buscador.value.toLowerCase();

            const filtrados =
                productos.filter(p =>

                    p.nombre
                     .toLowerCase()
                     .includes(texto)

                );

            mostrar(filtrados);

            if (sugerencias) {
                sugerencias.style.display = "none";
            }
        }
    });
}

/* ======================
   CLICK SUGERENCIAS
====================== */

if (sugerencias) {

    sugerencias.addEventListener("click", (e) => {

        if (
            e.target.classList.contains(
                "sugerencia-item"
            )
        ) {

            buscador.value =
                e.target.innerText;

            const filtrados =
                productos.filter(p =>

                    p.nombre
                     .toLowerCase()
                     .includes(
                        buscador.value
                        .toLowerCase()
                     )

                );

            mostrar(filtrados);

            sugerencias.style.display = "none";
        }
    });
}

/* ======================
   SCROLL HERO
====================== */

function scrollCatalogo() {

    window.scrollTo({

        top: 700,

        behavior: "smooth"

    });
}
