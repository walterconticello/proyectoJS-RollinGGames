import {categorias, crearCategoria, borrarCategoria} from "./modeloCategoriasCRUD.js";

let tablaJuego = localStorage.getItem("tablaJuegoStorage");
tablaJuego = JSON.parse(tablaJuego);
if (tablaJuego == null) {
    tablaJuego = [];
}

let idForm = localStorage.getItem("idForm");
idForm = JSON.parse(idForm);
if (idForm == null) {
    idForm = 0;
}

let btnNuevaCat = document.getElementById("btnNuevaCat");
let tablaCat = document.getElementById("tablaCategorias");
let botonesBorrarCat = document.getElementsByClassName("btn-borrarCat");

btnNuevaCat.addEventListener("click", (e) => {
    e.preventDefault();
    let nuevaCategoria = document.getElementById("inputNuevaCat");
    let mensajeCat = document.getElementById("nuevaCatMje");
    const nombreCat = nuevaCategoria.value;
    if(nombreCat){
        mensajeCat.innerText = crearCategoria(nombreCat);
        nuevaCategoria.value = "";
        if(!(mensajeCat.innerText == "La categoría ya existe")){
            setTimeout(() => {
                $('#modalCategoriasNueva').modal('hide');
              }, 1000);
        }
        actualizarTablaCat();
    }
});

const actualizarTablaCat = () => {
    tablaCat.tBodies[0].innerHTML = "";
    let trCat;
    let tdCat;
    for(let i = 0; i < categorias.length; i++){
        trCat = tablaCat.tBodies[0].insertRow();
        tdCat = trCat.insertCell();
        tdCat.innerText = categorias[i];
        tdCat = trCat.insertCell();
        tdCat.appendChild(crearBotonBorrarCat());
        tdCat.setAttribute("class","text-center");
    }
    asignarListenersBorrar();
    cargarCategorias();
}

const asignarListenersBorrar = () => {
    for(let i = 0; i < botonesBorrarCat.length; i++){
        botonesBorrarCat[i].addEventListener("click", () => {
            Swal.fire({
                title: 'Seguro?',
                text: "Confirma para eliminar el género",
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
                    borrarCategoria(categorias[i]);
                    actualizarTablaCat();
                    Swal.fire({
                        title: 'Éxito!',
                        text: "Género eliminado",
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

const crearBotonBorrarCat = () => {
    let borrar = document.createElement("i");
    borrar.setAttribute("class","bi bi-x-circle-fill btn-borrarCat");
    return borrar;
}

const cargarCategorias = () => {
    let boxCat = document.getElementById("cboGenero");
    boxCat.innerHTML="";
    let option;
    for(let i=0; i < categorias.length; i++) {
        option = document.createElement("option");
        option.innerText= categorias[i];
        boxCat.appendChild(option);
    }
}

const defaulOption = () => {
    if (idForm > 0) {
        for (const i in tablaJuego) {
            let letJuego = JSON.parse(tablaJuego[i]);
            if (letJuego.IdJuego == idForm) {
                document.getElementById("cboGenero").value = letJuego.genero;
                break;
            }
        }
    }
    else{
        document.getElementById("cboGenero").value = "";
    }
}

actualizarTablaCat();
defaulOption();
