let productos = [];
let seleccionados = [];

fetch("productos.json")
.then(r => r.json())
.then(data => productos = data);

/* ======================
   PASOS
====================== */

function irPaso2(){
document.getElementById("paso1").classList.add("oculto");
document.getElementById("paso2").classList.remove("oculto");
}

function irPaso3(){
document.getElementById("paso2").classList.add("oculto");
document.getElementById("paso3").classList.remove("oculto");
}

/* ======================
   BUSCADOR
====================== */

document.addEventListener("input", (e)=>{

if(e.target.id !== "buscador") return;

let texto = e.target.value.toLowerCase();

if(!texto) return;

let filtrados = productos.filter(p =>
p.nombre.toLowerCase().includes(texto)
);

document.getElementById("sugerencias").innerHTML =
filtrados.map(p=>`
<div onclick="agregar('${p.nombre}')">
${p.nombre}
</div>
`).join("");

});

/* ======================
   AGREGAR
====================== */

function agregar(nombre){

let cantidad = prompt("Cantidad:");

seleccionados.push({nombre, cantidad});

alert("Añadido: " + nombre);
}

/* ======================
   GUARDAR
====================== */

function guardarPedido(){

let pedido = {
cliente: document.getElementById("cliente").value,
direccionEntrega: document.getElementById("dirEntrega").value,
direccionRecogida: document.getElementById("dirRecogida").value,
fechaEntrega: document.getElementById("fechaEntrega").value,
fechaRecogida: document.getElementById("fechaRecogida").value,
productos: seleccionados
};

let datos = JSON.parse(localStorage.getItem("entregas")) || [];

datos.push(pedido);

localStorage.setItem("entregas", JSON.stringify(datos));

alert("Pedido creado");

location.reload();

}

/* ======================
   MOSTRAR
====================== */

function render(){

let datos = JSON.parse(localStorage.getItem("entregas")) || [];

let lista = document.getElementById("lista");

lista.innerHTML = "";

datos.forEach((p,i)=>{

lista.innerHTML += `
<div class="pedido-guardado">

<h3>${p.cliente}</h3>

<p>${p.direccionEntrega}</p>

<button onclick="entregado(${i})">
✅ Entregado
</button>

</div>
`;

});

}

/* ======================
   ENTREGADO → RECOGIDAS
====================== */

function entregado(i){

let entregas = JSON.parse(localStorage.getItem("entregas")) || [];
let recogidas = JSON.parse(localStorage.getItem("recogidas")) || [];

recogidas.push(entregas[i]);

entregas.splice(i,1);

localStorage.setItem("entregas", JSON.stringify(entregas));
localStorage.setItem("recogidas", JSON.stringify(recogidas));

render();

}

render();