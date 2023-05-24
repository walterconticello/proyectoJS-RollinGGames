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

cargarPagina();

function generarID() {
    let id = Math.floor(Math.random() * 90000) + 10000;
    while (tablaJuego.find(juego => juego.IdJuego === id)) {
        id = Math.floor(Math.random() * 90000) + 10000;
    }
    document.getElementById("txtIdJuego").value = id;
}


function guardar() {
    let IdJuego = document.getElementById("txtIdJuego").value;
    let nombre = document.getElementById("txtNombre").value;
    let genero = document.getElementById("cboGenero").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = document.getElementById("txtPrecio").value;
    let url = document.getElementById("txtUrl").value;

    if (!nombre || !genero || !descripcion || !precio || !url || !IdJuego || parseInt(precio)<0) {
        Swal.fire({
            title: 'ERROR',
            text: 'Debe completar todos los campos',
            icon: 'error',
            iconColor: "red",
            backdrop: true,
            background: "#000000",
            color: "#ffffff",
            confirmButtonText: 'Confirmar',
            confirmButtonColor: 'rgb(103, 58, 183)',
        });
        return;
    }
    
    if (!validarURL(url)) {
        Swal.fire('ERROR', 'La URL debe ser de una imagen JPG o PNG', 'error');
        return;
    }

    Swal.fire({
        title: 'GUARDAR',
        html: 'DESEA GUARDAR LOS CAMBIOS?',
        showDenyButton: true,
        backdrop: true,
        background: "#000000",
        color: "#ffffff",
        confirmButtonText: 'SI',
        confirmButtonColor: 'rgb(103, 58, 183)',
        denyButtonColor: '#14112E',
        denyButtonText: 'NO'
    }).then(
        (result) => {
            if (result.isConfirmed) {

                console.log("PRESIONO GUARDAR...");
                let objJuego = JSON.stringify({
                    
                    IdJuego: document.getElementById("txtIdJuego").value,
                    nombre: document.getElementById("txtNombre").value,
                    genero: document.getElementById("cboGenero").value,
                    descripcion: document.getElementById("txtDescripcion").value,
                    precio: document.getElementById("txtPrecio").value,
                    url: document.getElementById("txtUrl").value,
                    
                    
                });
                let url = $('#txtUrl').val();
                $('#imgMiniatura').attr('src', url).show();

                console.log(objJuego);
                
                if (idForm > 0) {
                    for (const i in tablaJuego) {
                        let letJuego = JSON.parse(tablaJuego[i]);
                        if (letJuego.IdJuego == idForm) {
                            tablaJuego[i] = objJuego;
                            break;
                        }

                    }

                } else {
                    
                    tablaJuego.push(objJuego);
                }

                localStorage.setItem("tablaJuegoStorage", JSON.stringify(tablaJuego));

                Swal.fire({
                    title: 'Éxito!',
                    text: 'Cambios guardados correctamente',
                    icon: 'success',
                    iconColor: "green",
                    backdrop: true,
                    background: "#000000",
                    color: "#ffffff",
                    confirmButtonText: 'Confirmar',
                    confirmButtonColor: 'rgb(103, 58, 183)',
                }).then(
                    (result)=>{
                        window.location.replace("./administracion.html");
                    }
                );
            }else if (result.isDenied){
                Swal.fire('CAMBIOS NO GUARDADOS','','info');
            }
        }
    );
    

}

function cargarPagina() {
    if (idForm > 0) {
        
        for (const i in tablaJuego) {
            let letJuego = JSON.parse(tablaJuego[i]);
            if (letJuego.IdJuego == idForm) {
                document.getElementById("txtIdJuego").value = letJuego.IdJuego;
                document.getElementById("txtNombre").value = letJuego.nombre;
                document.getElementById("cboGenero").value = letJuego.genero;
                document.getElementById("txtDescripcion").value = letJuego.descripcion;
                document.getElementById("txtPrecio").value = letJuego.precio;
                document.getElementById("txtUrl").value = letJuego.url;
                document.getElementById("imgMiniatura").src = letJuego.url;
                document.getElementById("imgMiniatura").style.display = "block";
                break;
            }
        }
    }
}

const inputUrl = document.getElementById("txtUrl");


inputUrl.addEventListener("input", () => {
  const url = inputUrl.value.toLowerCase();
  
  if (validarURL(url)) {
    
    document.getElementById("imgMiniatura").src = url;
    document.getElementById("imgMiniatura").style.display = "block";
  } else {
    
    document.getElementById("imgMiniatura").style.display = "none";
    swal.fire({
      icon: "error",
      title: "Error",
      text: "La URL debe ser de una imagen JPG o PNG",
      confirmButtonText: "Aceptar",
    });
  }
  document.getElementById("imgMiniatura").src = inputUrl.value;
  document.getElementById("imgMiniatura").style.display = "block";
});


function validarURL(miurl) {
    try {
   
      path = new URL(miurl);
      path = path.pathname.toLowerCase();
      if(path.endsWith(".jpg")||path.endsWith(".jpg/")||path.endsWith(".png")||path.endsWith(".png/")) {
        return true;
      }
      return  false;
   
    } catch (err) {
   
      return false;
   
    }
  }
