
import {cuentas,eliminarCuenta} from "./modeloUsuariosCRUD.js";


const tablaUsuarios = document.getElementById("tablaUsuarios");
let botonesBorrar = document.getElementsByClassName("btn-borrar");
let botonesVer = document.getElementsByClassName("btn-ver");


const actualizarTabla = () => {
    tablaUsuarios.tBodies[0].innerHTML = "";
    let trUsuario;
    let tdUsuario;
    for(let i = 0; i < cuentas.length; i++){
        trUsuario = tablaUsuarios.tBodies[0].insertRow();
        tdUsuario = trUsuario.insertCell();
        tdUsuario.innerText = `${i+1}`;
        for(let j = 0; j < Object.values(cuentas[i]).length - 2; j++){
            tdUsuario = trUsuario.insertCell();
            if(j!=2){
                tdUsuario.innerText = Object.values(cuentas[i])[j];
            }
            else{
                tdUsuario.innerText = ocultarClave(Object.values(cuentas[i])[j]);
            }
        }
        tdUsuario = trUsuario.insertCell();
        if(i>0){
            tdUsuario.appendChild(crearBotonBorrar());
            tdUsuario.setAttribute("class","text-center");
        }
        tdUsuario = trUsuario.insertCell();
        tdUsuario.appendChild(crearBotonVer());
        tdUsuario.setAttribute("class","text-center");
    }
    asignarListenersBorrar();
    asignarListenersVer();
}
const crearBotonBorrar = () => {
    let borrar = document.createElement("i");
    borrar.setAttribute("class","bi bi-x-circle-fill btn-borrar");
    borrar.setAttribute("title","Eliminar Cuenta");
    return borrar;
}
const crearBotonVer = () => {
    let ver = document.createElement("i");
    ver.setAttribute("class","bi bi-eye-fill btn-ver");
    ver.setAttribute("title","Revelar Contraseña");
    return ver;
}
const ocultarClave = (clave) => {
    let claveOculta = "";
    for(let i = 0; i < clave.length; i++){
        claveOculta += "*";
    }
    return claveOculta;
}


const asignarListenersBorrar = () => {
    for(let i = 0; i < botonesBorrar.length; i++){
        botonesBorrar[i].addEventListener("click", () => {
            Swal.fire({
                title: 'Seguro?',
                text: "Confirma para eliminar la cuenta",
                icon: 'warning',
                iconColor: "red",
                backdrop: true,
                background: "#000000",
                color: "#ffffff",
                showCancelButton: true,
                confirmButtonColor: 'rgb(103, 58, 183)',
                cancelButtonColor: '#14112E',
                confirmButtonText: 'Confirmar',
                cancelButtonText: "Volver",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarCuenta(cuentas[i+1]);
                    actualizarTabla();
                    Swal.fire({
                        title: 'Éxito!',
                        text: "Cuenta eliminada",
                        backdrop: true,
                        icon: 'success',
                        iconColor: "green",
                        background: "#000000",
                        color: "#ffffff",
                        confirmButtonText: 'Confirmar',
                        confirmButtonColor: 'rgb(103, 58, 183)',
                    })
                }
            })
        });
    }
}

const asignarListenersVer = () => {
    for(let i = 0; i < botonesVer.length; i++){
        botonesVer[i].addEventListener("mouseover", () => {
            tablaUsuarios.tBodies[0].childNodes[i].childNodes[3].innerText = cuentas[i].clave;
        });
        botonesVer[i].addEventListener("mouseout", () => {
            setTimeout(()=>{
                tablaUsuarios.tBodies[0].childNodes[i].childNodes[3].innerText = ocultarClave(cuentas[i].clave);
            },"800")
        });
    }
}


actualizarTabla();