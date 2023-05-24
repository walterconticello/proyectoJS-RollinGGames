//IMPORTACIÓN DEL MODELO
import {cuentaActiva} from "./modeloUsuariosCRUD.js";
if(cuentaActiva === null || cuentaActiva.admin === false){
    window.location.href = "../pages/error404.html";
}