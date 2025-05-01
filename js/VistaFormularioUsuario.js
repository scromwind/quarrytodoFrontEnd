import { ConstruirInicioSesion } from "./ControlVistas.js";

export function VistaFormularioUsuario(){
    let vista = document.createElement('div');
    vista.id = "formularioUsuario"
    vista.innerHTML = `
        <form class="container mt-5 p-4 border rounded shadow-sm bg-white" style="max-width: 400px;">
            <h2> Nuevo Usuario </h2>
            <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre">
            </div>

            <div class="mb-3">
            <label for="dni" class="form-label">DNI</label>
            <input type="text" class="form-control" id="dni" name="dni" placeholder="Ingresa tu DNI">
            </div>

            <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" name="contraseña" placeholder="Crea una contraseña">
            </div>

            <div class="d-grid gap-2">
            <button type="button" class="btn btn-success" id="btnCrearUsuario">Crear</button>
            <button type="button" class="btn btn-secondary" id="btnIniciarSesion">Cancelar</button>
            </div>
        </form>
        `;

    return vista
}

async function CrearUsuario(json){
    try{
        const respuesta = await fetch(window.urlWeb+'/usuarios/crear',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:json
        });
        return respuesta;
    }catch(error){
        console.error('Error al crear usuario: ',error);
        return false;
    }

}

async function DatosUsuario(){
    let inputNombre = document.getElementById("nombre").value;
    let inputDni = document.getElementById("dni").value;
    let inputPassword = document.getElementById("password").value;

    let json = JSON.stringify({
        nombre:inputNombre,
        dni:inputDni,
        password:inputPassword
    });

    const respuesta =  await CrearUsuario(json);

    if(!respuesta){
        alert("Error al crear usuario ",respuesta.error)
    }else{
        alert('usuario creado con exito');
        ConstruirInicioSesion();
    }
}

export function EventosFormularioUsuario(){
    let btnIniciarSesion = document.getElementById("btnIniciarSesion")
    let btnCrearUsuario = document.getElementById("btnCrearUsuario")

    if(btnCrearUsuario != null){
        btnCrearUsuario.addEventListener("click",
            async () => {
                DatosUsuario();
            }
        )
    }
    
    if(btnIniciarSesion != null){
        btnIniciarSesion.addEventListener("click",
            () => {
                ConstruirInicioSesion()
            }
        )
    }
}