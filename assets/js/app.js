// VARIABLES GLOBALES
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
let editandoId = null;

// GENERAR ID ÚNICO
function generarId() {
  return Date.now();
}

// AGREGAR O ACTUALIZAR PRODUCTO
function guardarProducto(nombre, categoria, precioNeto, stock) {
  if (!nombre || !categoria || precioNeto <= 0 || stock < 0) {
    alert("Debe completar todos los campos correctamente");
    return;
  }

  nombre = nombre.trim().toUpperCase();

  let precioConIVA = Math.round(precioNeto * 1.19);

  if (editandoId === null) {
    // AGREGAR
    let producto = {
      id: generarId(),
      nombre: nombre,
      categoria: categoria,
      precioNeto: precioNeto,
      precio: precioConIVA,
      stock: stock,
    };

    inventario.push(producto);
  } else {
    // EDITAR
    for (let producto of inventario) {
      if (producto.id === editandoId) {
        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.precioNeto = precioNeto;
        producto.precio = precioConIVA;
        producto.stock = stock;
      }
    }

    editandoId = null;
  }

  guardarInventario();
  renderizarInventario();
  document.getElementById("formProducto").reset();
}

// ELIMINAR PRODUCTO
function eliminarProducto(id) {
  inventario = inventario.filter((p) => p.id !== id);
  guardarInventario();
  renderizarInventario();
}

// ACTIVAR EDICIÓN
function editarProducto(id) {
  let producto = inventario.find((p) => p.id === id);

  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("precio").value = producto.precioNeto;
  document.getElementById("stock").value = producto.stock;

  editandoId = id;
}

// BUSCAR PRODUCTO
function buscarProducto(texto) {
  texto = texto.toUpperCase();

  return inventario.filter((producto) => producto.nombre.includes(texto));
}

// CALCULAR VALOR TOTAL
function calcularValorTotal() {
  let total = 0;
  let i = 0;

  while (i < inventario.length) {
    total += inventario[i]["precio"] * inventario[i]["stock"];
    i++;
  }

  return total;
}

// GUARDAR EN LOCALSTORAGE
function guardarInventario() {
  localStorage.setItem("inventario", JSON.stringify(inventario));
}

// RENDERIZAR TABLA
function renderizarInventario(lista = inventario) {
  const tabla = document.getElementById("tablaInventario");
  tabla.innerHTML = "";

  for (let producto of lista) {
    let subtotal = producto.precio * producto.stock;

    tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precioNeto}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>$${subtotal}</td>
            <td>
                <button onclick="editarProducto(${producto.id})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        </tr>
        `;
  }

  document.getElementById("valorTotal").textContent =
    "Valor Total del Inventario (con IVA): $" + calcularValorTotal();
}

// EVENTOS
document
  .getElementById("formProducto")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    guardarProducto(
      nombre.value,
      categoria.value,
      parseFloat(precio.value),
      parseInt(stock.value),
    );
  });

document.getElementById("buscador").addEventListener("input", function () {
  let resultados = buscarProducto(this.value);
  renderizarInventario(resultados);
});

// INICIALIZAR
renderizarInventario();
