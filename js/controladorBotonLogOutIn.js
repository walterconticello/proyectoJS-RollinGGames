
import {cuentaActiva, cerrarSesion} from "./modeloUsuariosCRUD.js";


const contenedorLog = document.getElementById("contenedorLog");
const botonLog = document.getElementById("botonLog");
const botonLogDivTexto = document.getElementById("botonLogTexto");


const actualizarCuentaActiva = ()=>{
    if(cuentaActiva !== null){
        botonLogDivTexto.innerHTML = cuentaActiva.usuario;
        let iconLogout = document.createElement("button");
        iconLogout.innerHTML = '<i class="bi bi-x-circle"></i>';
        iconLogout.className ="btn btn-outline-light crucetaLogout";
        iconLogout.setAttribute("title","Cerrar Sesión");
        iconLogout.addEventListener("click",()=>{
            cerrarSesion();
            window.location.reload();
        });
        contenedorLog.appendChild(iconLogout);
    }
    else{
        botonLogDivTexto.innerHTML = "Ingresar";
    }
    añadirEventoClickBotonLog();
}

const añadirEventoClickBotonLog = ()=>{
    if(cuentaActiva !== null){
        botonLog.addEventListener("click",()=>{
            window.location.href = "../pages/error404.html"; 
        });
    }
    else{
        botonLog.addEventListener("click",()=>{
            window.location.href = "../pages/LoginRegistro.html"; 
        });
    }
}


actualizarCuentaActiva();

