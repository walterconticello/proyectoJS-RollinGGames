const formContacto = document.getElementById('form-contacto')

formContacto.addEventListener('submit', (e)=>{
  e.preventDefault()
  Swal.fire({
    title: 'Quieres enviar tu consulta?',
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, enviar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Has enviado tu consulta a nuestro soporte',
        formContacto.reset()
      )
    }
  })
  
})