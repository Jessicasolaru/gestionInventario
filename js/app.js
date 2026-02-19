// ==========================
// ARREGLO QUE ALMACENA EL INVENTARIO
// ==========================
let inventario = [];

// ==========================
// FUNCIÓN PARA AGREGAR PRODUCTO
// ==========================
function agregarProducto(nombre, categoria, precio, stock) {
  // Validación con if
  if (nombre === "" || categoria === "" || precio <= 0 || stock < 0) {
    alert("Datos inválidos");
    return;
  }

  // Uso de métodos de string
  nombre = nombre.trim().toUpperCase();

  // Redondeo con Math
  precio = Math.round(precio * 1.19); // incluye 19% impuesto

  // Creación del objeto
  let producto = {
    nombre: nombre,
    categoria: categoria,
    precio: precio,
    stock: stock,
  };

  inventario.push(producto);
  mostrarInventario();
}

// ==========================
// FUNCIÓN PARA MOSTRAR INVENTARIO
// ==========================
function mostrarInventario() {
  let tabla = document.getElementById("tablaInventario");
  tabla.innerHTML = "";

  // Ciclo for
  for (let i = 0; i < inventario.length; i++) {
    let producto = inventario[i];

    tabla.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                    <button class="eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
                </td>
            </tr>
        `;
  }

  calcularValorTotal();
}

// ==========================
// FUNCIÓN PARA ELIMINAR
// ==========================
function eliminarProducto(indice) {
  inventario.splice(indice, 1);
  mostrarInventario();
}

// ==========================
// FUNCIÓN PARA CALCULAR VALOR TOTAL
// ==========================
function calcularValorTotal() {
  let total = 0;
  let i = 0;

  // Ciclo while
  while (i < inventario.length) {
    total += inventario[i].precio * inventario[i].stock;
    i++;
  }

  document.getElementById("valorTotal").textContent = "Valor Total: $" + total;
}

// ==========================
// EVENTO DEL FORMULARIO
// ==========================
document
  .getElementById("formProducto")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let categoria = document.getElementById("categoria").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    agregarProducto(nombre, categoria, precio, stock);

    this.reset();
  });
