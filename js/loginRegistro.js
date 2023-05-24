
import {cuentas, cuentaActiva, registro, buscarCuentaCorreo, buscarCuentaUsuario, iniciarSesion, cerrarSesion} from "./modeloUsuariosCRUD.js"

console.log(cuentaActiva);

const formReg = document.getElementById('formReg')
const inputs = document.querySelectorAll('#formReg input')
const nombreRegistro = document.getElementById('nombreRegistro')
const mailRegistro = document.getElementById('mailRegistro')
const contraseniaRegistro = document.getElementById('contraseniaRegistro')


const expresiones = {
  nombre : /^[a-zA-Z0-9ñ]{3,30}$/,
  email: /^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$/,
  contrasenia: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+-])[a-zA-Z0-9ñ!@#$%^&*_+-]{4,16}$/
}


const campos = {
  nombre : false,
  email: false,
  contrasenia: false
}


const validarFormulario = (e)=>{
  switch (e.target.name){
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre')
    break
    case "email":
      validarCampo(expresiones.email, e.target, 'email')
    break
    case "clave":
      validarCampo(expresiones.contrasenia, e.target, 'contrasenia')
      validarContrasenia()
    break
    case "clave2":
      validarContrasenia()
    break
  }
}


const validarCampo = (expresion, input, campo)=>{
  if(expresion.test(input.value)){
    document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto')
    document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto')
    document.querySelector(`#grupo-${campo} i`).classList.add('bi-check')
    document.querySelector(`#grupo-${campo} i`).classList.remove('bi-x-circle')
    campos[campo] = true
  }else{
    document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto')
    document.querySelector(`#grupo-${campo} i`).classList.add('bi-x-circle')
    document.querySelector(`#grupo-${campo} i`).classList.remove('bi-check')
    document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto')
    campos[campo] = false
  }
}



const validarContrasenia = ()=>{
  const contraseniaRegistro2 = document.getElementById('contraseniaRegistro2')
  if(contraseniaRegistro.value !== contraseniaRegistro2.value){
    document.getElementById(`grupo-contrasenia2`).classList.add('formulario-grupo-incorrecto')
    document.querySelector(`#grupo-contrasenia2 i`).classList.add('bi-x-circle')
    document.querySelector(`#grupo-contrasenia2 i`).classList.remove('bi-check')
    document.getElementById(`grupo-contrasenia2`).classList.remove('formulario-grupo-correcto')
    campos['contrasenia'] = false
  }else{
    document.getElementById(`grupo-contrasenia2`).classList.remove('formulario-grupo-incorrecto')
    document.querySelector(`#grupo-contrasenia2 i`).classList.remove('bi-x-circle')
    document.querySelector(`#grupo-contrasenia2 i`).classList.add('bi-check')
    document.getElementById(`grupo-contrasenia2`).classList.add('formulario-grupo-correcto')
    campos['contrasenia'] = true
  }
}


inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})


formReg.addEventListener('submit', (e) =>{
  e.preventDefault()

  const nombreRegistrado = cuentas.find(usuario=> usuario.usuario === nombreRegistro.value)
  const correoRegistrado = cuentas.find(usuario => usuario.correo === mailRegistro.value)
  if(correoRegistrado){
      
      return Swal.fire({
        text: "Ya existe una cuenta registrada con este mail",
        background: "#000000",
        color: "#ffffff",
        position: "top",
        backdop: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'rgb(103, 58, 183)',
      });
    }else if (nombreRegistrado){
      
      return Swal.fire({
        text: "El nombre de usuario que elegiste ya esta en uso",
        background: "#000000",
        color: "#ffffff",
        position: "top",
        backdop: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'rgb(103, 58, 183)',
      });
    }
  
  
  if(campos.nombre && campos.contrasenia && campos.email){
    
    
    document.querySelectorAll('.formulario-grupo-correcto').forEach((icono)=>{
      icono.classList.remove('formulario-grupo-correcto')
    })
    registro(nombreRegistro.value, mailRegistro.value, contraseniaRegistro.value)
    if(cuentaActiva===null){
      iniciarSesion(mailRegistro.value,contraseniaRegistro.value)
      formReg.reset()
      window.location.href = '../index.html'
    }
    else{
      formReg.reset()
      
      return Swal.fire({
        text: "Su cuenta se registró con éxito, pero hay otra sesión abierta.",
        background: "#000000",
        color: "#ffffff",
        position: "top",
        backdop: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'rgb(103, 58, 183)',
      });
    }
    
  }else{
    document.getElementById('formulario-mensaje').classList.add('formulario-mensaje-activo')
    setTimeout(()=>{
      document.getElementById('formulario-mensaje').classList.remove('formulario-mensaje-activo')
    }, 5000)
  } 
  
  })


  
const formIng = document.getElementById('formIng')
const mailIngresar = document.getElementById('mailIngresar')
const contraseniaIngresar = document.getElementById('contraseniaIngresar')
const labelIngresar = document.querySelector('#formIng label')



labelIngresar.addEventListener('click',()=>{
  document.querySelectorAll('.formulario-grupo-correcto').forEach((icono)=>{
    icono.classList.remove('formulario-grupo-correcto')
  })
  document.querySelectorAll('.formulario-grupo-incorrecto').forEach((icono)=>{
    icono.classList.remove('formulario-grupo-incorrecto')
  })
})

formIng.addEventListener('submit', (e)=>{
  e.preventDefault()

  const validarUsuario = cuentas.find(usuario=> usuario.clave === contraseniaIngresar.value && usuario.correo === mailIngresar.value) 
  if(!validarUsuario){
    
    return Swal.fire({
      text: "La contraseña o usuario son incorrectos.",
      background: "#000000",
      color: "#ffffff",
      position: "top",
      backdop: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: 'rgb(103, 58, 183)',
    });
  }

  if(cuentaActiva){
    
    return Swal.fire({
      text: "Ya hay una sesion abierta, cierrela para iniciar sesion con otra cuenta.",
      background: "#000000",
      color: "#ffffff",
      position: "top",
      backdop: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: 'rgb(103, 58, 183)',
    });
  }
  
  const esAdmin = cuentas.find(admin=> admin.correo === mailIngresar.value && admin.admin === true)
  if(esAdmin){
    iniciarSesion(mailIngresar.value, contraseniaIngresar.value)
    window.location.href = '../pages/administracion.html'
  }else{
    iniciarSesion(mailIngresar.value, contraseniaIngresar.value)
    window.location.href = '../index.html'
  }
})