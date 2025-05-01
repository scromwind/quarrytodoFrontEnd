import { ConstruirFormularioUsuario, ConstruirListarTareas } from "./ControlVistas.js";

export function VistaInicioSesion(){
    let vista = document.createElement('div');
        vista.id = "inicioSesion"
        vista.innerHTML = `
            <form class="container mt-5 p-4 border rounded shadow-sm bg-light" style="max-width: 400px;">
                <h2> Inicio Sesion </h2>
                <div class="mb-3">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Ingresa tu usuario">
                </div>
                
                <div class="mb-3">
                    <label for="loginPassword" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="loginPassword" name="password" placeholder="Ingresa tu contraseña">
                </div>

                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" id="btnIniciarSesion">Ingresar</button>
                    <button type="button" class="btn btn-secondary" id="btnNuevoUsuario">Crear Cuenta</button>
                </div>
            </form>
        `;

    return vista
}

async function ConsultaCredenciales(json) {
    try {
      const response = await fetch(window.urlWeb+'/usuarios/iniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      });
      
      if(!response.ok){
        console.error("error ",response.status)
      }

      const datos = await response.text();

      if(datos){
        return JSON.parse(datos);
      }else{
        console.warn("Respuesta vacia");
        return null;
      }


    } catch (error) {
      console.error('Error a el iniciar sesion', error);
      alert('Credenciales incorrectas');
      return false;
    }
  }

async function ValidarCredenciales(){
    let inputUsuario = document.getElementById("usuario").value
    let inputPassword = document.getElementById("loginPassword").value
    let json = JSON.stringify({
        dni:inputUsuario,
        password:inputPassword
    })
    let datos = await ConsultaCredenciales(json);
    
    if(datos && datos.id){
        localStorage.setItem('idSesion',datos.id);
        ConstruirListarTareas();    
    }else{
        alert("problema al iniciar sesion o datos incorrectos")
    }
    
}

export function EventosIniciSesion(){
    let btnIniciarSesion = document.getElementById("btnIniciarSesion")
    let btnNuevoUsuario = document.getElementById("btnNuevoUsuario")

    if(btnNuevoUsuario != null){
        btnNuevoUsuario.addEventListener("click",
            () => {
                ConstruirFormularioUsuario()
            }
        )
    }
    
    if(btnIniciarSesion != null){
        btnIniciarSesion.addEventListener("click",
            async () => {
                await ValidarCredenciales()  
            }
        )
    }
}







