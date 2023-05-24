//IMPORTACIÓN DEL MODELO
import {cuentaActiva} from "./modeloUsuariosCRUD.js";
if(cuentaActiva === null || cuentaActiva.admin === false){
    let linkAdmin = document.getElementById('linkAdmin');
    linkAdmin.style.display = 'none';
}