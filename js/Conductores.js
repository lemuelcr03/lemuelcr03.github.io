$(document).on('click', '#btn_save', function (event) {
  event.preventDefault();

  if ($("#txtNombre").val() != null && $("#txtNombre").val() != "") {
    if (localStorage.getItem('Id') > 0) {
      
      Swal.fire({
        title: '¿Desea Actualizar Datos?',
        text: "Se Actualizará la información del Conductor",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {

          nombre = $("#txtNombre").val();
          contacto = $("#txtContacto").val();

          $.ajax({
            type: "POST",
            url: "php/actualizar_conductor.php",
            data: {
              'Id': localStorage.getItem('Id'),
              'Nombre': nombre,
              'Contacto': contacto
            },
            success: function (data) {
              if (data == 'Vacio') { //Verifica el resultado
                Swal.fire({
                  type: 'error',
                  title: 'Validación',
                  text: 'Debe completar todos los campos'
                })
              } else

                cargarconductores();
              clearfields();
              $("#myModal").modal('hide');
            }
          })
        }
      })
    } else

    {
      Swal.fire({
        title: '¿Desea Guardar?',
        text: "Se Creará un nuevo Conductor",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {

          Nombre = $("#txtNombre").val();
          Contacto = $("#txtContacto").val();
          $.ajax({
            type: "POST",
            url: "php/save_conductor.php",
            data: {
              'Nombre': Nombre,
              'Contacto': Contacto
            },
            success: function (data) {
              if (data == 'Vacio') { //Verifica el resultado
                Swal.fire({
                  type: 'error',
                  title: 'Validación',
                  text: 'Debe completar todos los campos'
                })
              } else {

                /*
                Swal.fire({
                  type: 'success',
                  title: 'Validación',
                  text: 'Servicio Agregado Correctamente'
                })
                */
                cargarconductores();
                clearfields();
                $("#myModal").modal('hide');
              }
            }
          })
        }
      })
    }
  }
});

function clearfields() {
  $('#txtNombre').val('');
  $('#txtContacto').val('');
};

function conductor_info(id) {
  clearfields();
  localStorage.setItem('Id', id); //asignamos id de la obra a variable global
  $.ajax({
    type: "GET",
    url: "php/data_conductor.php",
    data: {
      'Id': id
    },
    success: function (data) {

      dataJson = JSON.parse(data);
      $("#txtNombre").val(dataJson.Nombre);
      $("#txtContacto").val(dataJson.Contacto);
    }
  })
};

function cargarconductores() {
  $.ajax({
    type: "POST",
    url: "php/llenar_tbl_conductores.php",
    /*data: { //si hay que pasar un parametro
      
    },*/
    success: function (data) {
      $("#tb_body_conductores").empty();
      $("#tb_body_conductores").append(data);
    }
  })
}

function conductor_delete(id) {
  Swal.fire({
    title: 'Eliminar Conductor',
    text: "¿Desea Eliminar este Conductor?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if ((result.value)) {
      //proceso de eliminación
      $.ajax({
        type: "POST",
        url: "php/delete_Conductor.php",
        data: {
          'Id': id
        },
        success: function (data) {
          cargarconductores();
        }
      })
    }
  })
}

$(document).on('click', '#addConductor', function (event) {
  clearfields();
  localStorage.setItem("Id", null);
});