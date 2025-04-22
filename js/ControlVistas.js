//importaciones
import { EventosNuevaTarea, VistaCrearTarea } from "./VistaFormularioTareas.js";
import { BuscarTareas, EventosListaTareas, FinalizarTarea, VistaListaTareas } from "./VistaListaTareas.js";
import { VistaFormularioUsuario,EventosFormularioUsuario } from "./VistaFormularioUsuario.js";
import { VistaInicioSesion,EventosIniciSesion } from "./VistaInicioSesion.js";

//Variables
const mainContainer = document.getElementById("container");
var sesionIniciada = localStorage.getItem('idSesion')

//funciones
export function ConstruirInicioSesion(){
    ConstruirVista(VistaInicioSesion());
    setTimeout(
        () =>{
            EventosIniciSesion();
        },0
    )
    
}

export function ConstruirFormularioUsuario(){
    ConstruirVista(VistaFormularioUsuario())
    setTimeout(
        () => {
            EventosFormularioUsuario()
        },0
    )
    
}

export function ConstruirListarTareas(){
    ConstruirVista(VistaListaTareas());
    setTimeout(
        () => {
            BuscarTareas()
        },0
    );
    setTimeout(
        () => {
            EventosListaTareas()
        },0
    );
}

export function ConstruirCrearTareas(tarea){
    ConstruirVista(VistaCrearTarea(tarea));
    setTimeout(
        ()=>{
            EventosNuevaTarea();
        }
    )
}

function ConstruirVista(vista) {
    mainContainer.innerHTML = "";
    mainContainer.appendChild(vista);
    
}

//logica
if(sesionIniciada !== null){
    ConstruirListarTareas();
}else{
    ConstruirInicioSesion();
}

export function Finalizar(id){
    FinalizarTarea(id)
}