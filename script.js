// Funciones en JavaScript para el CRUD

// Obtener los elementos del DOM
var formulario = document.getElementById("formulario");
var tabla = document.getElementById("tabla");
var guardar = document.getElementById("guardar");
var editar = document.getElementById("editar");
var eliminar = document.getElementById("eliminar");
var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var edad = document.getElementById("edad");

// Variable para almacenar el índice de la fila seleccionada
var filaSeleccionada = null;

// Función para guardar los datos
function guardarDatos(e) {
  // Evitar que el formulario se envíe
  e.preventDefault();
  // Crear un objeto con los datos
  var datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    edad: edad.valueAsNumber
  };
  // Si no hay fila seleccionada, insertar una nueva fila
  if (filaSeleccionada == null) {
    insertarFila(datos);
  } else {
    // Si hay fila seleccionada, actualizar los datos
    actualizarFila(datos);
  }
  // Limpiar el formulario
  limpiarFormulario();
}

// Función para insertar una nueva fila
function insertarFila(datos) {
  // Obtener el cuerpo de la tabla
  var tbody = tabla.tBodies[0];
  // Crear una nueva fila
  var fila = tbody.insertRow();
  // Crear las celdas con los datos
  var celdaNombre = fila.insertCell(0);
  celdaNombre.innerHTML = datos.nombre;
  var celdaApellido = fila.insertCell(1);
  celdaApellido.innerHTML = datos.apellido;
  var celdaEdad = fila.insertCell(2);
  celdaEdad.innerHTML = datos.edad;
  // Agregar un evento de clic a la fila
  fila.addEventListener("click", seleccionarFila);
}

// Función para actualizar una fila existente
function actualizarFila(datos) {
  // Obtener las celdas de la fila seleccionada
  var celdas = filaSeleccionada.cells;
  // Actualizar los datos de las celdas
  celdas[0].innerHTML = datos.nombre;
  celdas[1].innerHTML = datos.apellido;
  celdas[2].innerHTML = datos.edad;
}

// Función para limpiar el formulario
function limpiarFormulario() {
  // Vaciar los valores de los campos
  nombre.value = "";
  apellido.value = "";
  edad.value = "";
  // Desactivar los botones de editar y eliminar
  editar.disabled = true;
  eliminar.disabled = true;
  // Activar el botón de guardar
  guardar.disabled = false;
  // Establecer la fila seleccionada a null
  filaSeleccionada = null;
}

// Función para seleccionar una fila
function seleccionarFila(e) {
  // Obtener la fila que se clickeó
  var fila = e.target.parentNode;
  // Si es la misma fila que la anterior, no hacer nada
  if (fila == filaSeleccionada) {
    return;
  }
  // Si hay otra fila seleccionada, quitarle el estilo
  if (filaSeleccionada) {
    filaSeleccionada.classList.remove("seleccionada");
  }
  // Asignar la fila clickeada a la variable global
  filaSeleccionada = fila;
  // Agregarle un estilo a la fila seleccionada
  filaSeleccionada.classList.add("seleccionada");
  // Llenar el formulario con los datos de la fila seleccionada
  nombre.value = filaSeleccionada.cells[0].innerHTML;
  apellido.value = filaSeleccionada.cells[1].innerHTML;
  edad.value = filaSeleccionada.cells[2].innerHTML;
  // Activar los botones de editar y eliminar
  editar.disabled = false;
  eliminar.disabled = false;
  // Desactivar el botón de guardar
  guardar.disabled = true;
}

// Función para eliminar una fila
function eliminarFila() {
  // Si hay una fila seleccionada, eliminarla de la tabla
  if (filaSeleccionada) {
    filaSeleccionada.parentNode.removeChild(filaSeleccionada);
    // Limpiar el formulario
    limpiarFormulario();
  }
}

// Agregar un evento de submit al formulario
formulario.addEventListener("submit", guardarDatos);

// Agregar un evento de click al botón de eliminar
eliminar.addEventListener("click", eliminarFila);
