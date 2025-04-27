import { ConstruirCrearTareas, ConstruirInicioSesion, ConstruirListarTareas } from "./ControlVistas.js";

const urlLocal = 'http://localhost:8080'
const urlpublica = 'https://quarrytodobackend-production.up.railway.app'
// Genera la vista del HTML
export function VistaListaTareas() {
  let vista = document.createElement('div');
  vista.id = "Tareas";
  vista.innerHTML = `
  <div class="container mt-4">
    <h2>Lista de Tareas Pendientes</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table-primary">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descripción</th>
            <th colspan="3" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaTareas">
        </tbody>
      </table>
    </div>

    <div id="mensajeSinTareas"></div>

    <div class="d-flex gap-2 mt-3">
      <button type="button" class="btn btn-success" id="btnNuevaTarea">Añadir Tarea</button>
      <button type="button" class="btn btn-danger" id="btnCerrarSesion">Cerrar Sesion</button>
    </div>
  </div>
`;

  return vista;
}

// Trae los datos de la base de datos por medio de APIRest
export async function BuscarTareas() {
  let lista = [];
  let usuarioId= localStorage.getItem('idSesion');

  try {
    const respuesta = await fetch(urlpublica+'/tareas/listaTareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioId)
    });

    if(respuesta.ok){
      lista = await respuesta.json();
      LlenarTabla(lista); 
    }else{
      ListaVacia();
    }
  } catch (error) {
    console.log("Hubo un problema con la consulta a la API: ",respuesta);
  }

  return lista;
}

function ListaVacia(){
  let tarea = document.getElementById("tablaTareas");
  let mensaje = document.getElementById("mensajeSinTareas")

  if(tarea != null && mensaje != null){
    tarea.innerHTML="";
    mensaje.innerHTML=""
    mensaje.appendChild('<p>Sin tareas por mostrar</p>');
  }

}

// Llena la tabla con las tareas
function LlenarTabla(listaTareas) {
  let Tareas = document.getElementById("tablaTareas");
  let mensaje = document.getElementById("mensajeSinTareas")

  if (Tareas != null && mensaje != null) {
    mensaje.innerHTML=""
    Tareas.innerHTML=""
    listaTareas.forEach(tarea => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tarea.titulo}</td>
        <td>${tarea.descripcion}</td>
        <td>
          <button type="button" class="btn btn-success btn-sm btnFinalizarTarea" data-id="${tarea.id}">Finalizar</button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm btnEditarTarea" data-id="${tarea.id}">Editar</button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm btnEliminarTarea" data-id="${tarea.id}">Eliminar</button>
        </td>
      `;
      Tareas.appendChild(row);
    });

    // Delegar el evento al contenedor de las tareas (tbody)
    Tareas.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('btnFinalizarTarea')) {
        let tareaid = event.target.getAttribute('data-id');
        FinalizarTarea(tareaid); // Llamamos a la función que finaliza la tarea
      }
      if(event.target && event.target.classList.contains('btnEditarTarea')){
        let tareaid = event.target.getAttribute('data-id');
        EditarTarea(tareaid);
      }
      if(event.target && event.target.classList.contains('btnEliminarTarea')){
        let tareaid = event.target.getAttribute('data-id');
        EliminarTarea(tareaid);
      }
    });
  }
}

// Finaliza la tarea seleccionada
export async function FinalizarTarea(id) {
  let response = await fetch(urlpublica+'/finalizar', {
    method: 'POST',  // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido JSON
    },
    body: JSON.stringify(id) // Convertir datos a JSON
  })

  let texto = await response.text();

  if(response.ok){
    ConstruirListarTareas();
    alert(texto);
  }else{
    alert(texto);
  }
   

}

export async function EditarTarea(id) {
  
  const respuesta = await fetch(urlpublica+'/tareas/buscar', {
    method: 'POST',  // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido JSON
    },
    body: JSON.stringify(id) // Convertir datos a JSON
  })
  
  if(respuesta.ok){
    let datos = await respuesta.json();
    ConstruirCrearTareas(datos);
  }else{
    alert("El servidor no encontro la tarea");
  }
  
}

// Elimina la tarea seleccionada
export async function EliminarTarea(id) {
  const respuesta = await fetch(urlpublica+'/tareas/eliminar', {
    method: 'POST',  // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido JSON
    },
    body: JSON.stringify(id) // Convertir datos a JSON
  })
  
  const mensaje = await respuesta.text();
  if(respuesta.ok){
    alert(mensaje);
    ConstruirListarTareas();
  }else{
    alert(mensaje);
  }
}

// Da funcionalidad a los botones de esta vista (actualización de la vista, etc.)
export function EventosListaTareas() {
  // Aquí puedes agregar otros eventos si es necesario (como el de cerrar sesión o crear tarea)
  document.getElementById("btnNuevaTarea").addEventListener('click', () => {
    ConstruirCrearTareas(null);
  });

  document.getElementById("btnCerrarSesion").addEventListener('click', () => {
    localStorage.removeItem("idSesion")
    ConstruirInicioSesion();
  });
}
