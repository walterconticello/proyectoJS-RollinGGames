let tablaJuego = localStorage.getItem("tablaJuegoStorage");
if (tablaJuego !== null) {
    tablaJuego = JSON.parse(tablaJuego);
} else {
    tablaJuego = [];
}

listar();

function listar() {
    console.log("INGRESANDO A LISTAR...");

    let dataFila = '';

    if(tablaJuego.length > 0){
        for(const i in tablaJuego){
            let letJuego = JSON.parse(tablaJuego[i]);
            dataFila += "<tr>";
            dataFila += "<td>"+letJuego.IdJuego+"</td>";
            dataFila += "<td>"+letJuego.nombre+"</td>";
            dataFila += "<td>"+letJuego.genero+"</td>";
            dataFila += "<td>"+letJuego.descripcion+"</td>";
            dataFila += "<td>"+letJuego.precio+"</td>";
            dataFila += "<td><img src='" + letJuego.url + "' alt='" + letJuego.nombre + " thumbnail' width='60' height='50' ></td>";
            dataFila += "<td class='text-center'>"+
                        "<i class='bi bi-x-circle-fill btn-borrarJuego' onclick='eliminarItem("+letJuego.IdJuego+")' title='Eliminar Juego'></i>"+
                        "</td>";
            dataFila += "<td class='text-center'>"+
                        "<i class='bi bi-pencil-fill btn-editar' onclick='abrirForm("+letJuego.IdJuego+")' title='Editar Juego'></i>"+
                        "</td>";
            dataFila += "</tr>";

            

        }
        
        document.getElementById("dataJuego").innerHTML = dataFila;
    }
    else{
        document.getElementById("dataJuego").innerHTML = "<tr><td colspan='7'>No hay Juegos</td></tr>";
    }
}

function abrirForm(idForm){
    localStorage.setItem("idForm", JSON.stringify(idForm));
    window.location.replace("./Juegos-form.html");
}

function eliminarItem(idItem){
    Swal.fire({
        title: 'Seguro?',
        text: "Confirma para eliminar el juego",
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
            for(const i in tablaJuego){
                let letJuego = JSON.parse(tablaJuego[i]);
                if(letJuego.IdJuego == idItem){
                    tablaJuego.splice(i,1);
                    localStorage.setItem("tablaJuegoStorage", JSON.stringify(tablaJuego));
                }
            }
            Swal.fire({
                title: 'Éxito!',
                text: "Juego eliminado",
                backdrop: true,
                icon: 'success',
                iconColor: "green",
                background: "#000000",
                color: "#ffffff",
                confirmButtonText: 'Confirmar',
                confirmButtonColor: 'rgb(103, 58, 183)',
            })
            listar()
        }
    })
}