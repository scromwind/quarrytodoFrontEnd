import { ConstruirListarTareas } from "./ControlVistas.js";

const urlLocal = 'http://localhost:8080'
const urlpublica = 'https://quarrytodobackend-production.up.railway.app'

async function GuardarTarea(json) {
  try {
    const response = await fetch(urlLocal+'/tareas/crearTarea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    });

    return response.ok;
  } catch (error) {
    console.error('Error al guardar la tarea:', error);
    return false;
  }
}

async function CrearTarea() {
  let inputId = document.getElementById("idTarea").value;
  let inputTitulo = document.getElementById("titulo").value;
  let inputDescripcion = document.getElementById("descripcion").value;
  let json = JSON.stringify({
    id: inputId,
    titulo: inputTitulo,
    descripcion: inputDescripcion,
    finalizada: false,
    usuario: {
      id: localStorage.getItem('idSesion')
    }
  });

  const ok = await GuardarTarea(json);

  console.log("la respuesta del server es esta: ",ok)
  if (ok) {
    alert("Tarea creada con éxito");
    return true;
  } else {
    alert("Error al crear la tarea");
    return false;
  }
}


export function VistaCrearTarea(tarea){
  let vista;
  if (tarea !== null){
    vista = document.createElement("div");
    vista.id = "nueva-tarea";
    vista.innerHTML = `
      <form class="container mt-5 p-4 border rounded shadow-sm bg-white" style="max-width: 500px;">
        <h2> Editar Tarea </h2>
        <input type="hidden" id="idTarea" name="idTarea" value="${tarea.id}">

        <div class="mb-3">
          <label for="titulo" class="form-label">Título</label>
          <input value="${tarea.titulo}" type="text" class="form-control" id="titulo" name="titulo" placeholder="Título de la tarea">
        </div>

        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea class="form-control" id="descripcion" name="descripcion" rows="4" placeholder="Descripción de la tarea">${tarea.descripcion}</textarea>
        </div>

        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary" id="btnCrearTarea">Editar Tarea</button>
          <button type="button" class="btn btn-secondary" id="btnVolverListaTareas">Volver</button>
        </div>
      </form>
    `;
  }else{
    vista = document.createElement("div");
    vista.id = "nueva-tarea";
    vista.innerHTML = `
      
      <form class="container mt-5 p-4 border rounded shadow-sm bg-white" style="max-width: 500px;">
        <h2> Nueva Tarea </h2>
        <input type="hidden" id="idTarea" name="idTarea" value="">
        <div class="mb-3">
          <label for="titulo" class="form-label">Título</label>
          <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Título de la tarea">
        </div>

        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea class="form-control" id="descripcion" name="descripcion" rows="4" placeholder="Descripción de la tarea"></textarea>
        </div>

        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary" id="btnCrearTarea">Crear tarea</button>
          <button type="button" class="btn btn-secondary" id="btnVolverListaTareas">Volver</button>
        </div>
      </form>
    `;
  }

    return vista;
}

export function EventosNuevaTarea(){
    document.getElementById("btnVolverListaTareas").addEventListener("click",()=>{
        ConstruirListarTareas();
    });

    document.getElementById("btnCrearTarea").addEventListener("click",async() =>{
      const creada = await CrearTarea();
      if (creada) {
        ConstruirListarTareas();
      }
    }
    )
}
