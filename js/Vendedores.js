$(document).on('click', '#btn_save', function (event) {
  event.preventDefault();

  if ($("#txtNombre").val() != null && $("#txtNombre").val() != "") {
    if (localStorage.getItem('Id') > 0) {

      Swal.fire({
        title: '¿Desea Actualizar Datos?',
        text: "Se Actualizará la información del Vendedor",
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
            url: "php/actualizar_vendedor.php",
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

                cargarvendedores();
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
        text: "Se Creará un nuevo Vendedor",
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
            url: "../CRUD/save_vendedor.php",
            data: {
              'Nombre': Nombre,
              'Contacto': Contacto
            },
            success: function (data) {
              console.log(data);
              if (data == 'Vacio') { //Verifica el resultado
                Swal.fire({
                  type: 'error',
                  title: 'Validación',
                  text: 'Debe completar todos los campos'
                })
              } else {
                cargarvendedores();
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
  localStorage.setItem("Id", null);
};

function vendedor_info(id) {
  clearfields();
  localStorage.setItem('Id', id); //asignamos id de la obra a variable global
  $.ajax({
    type: "GET",
    url: "php/data_vendedor.php",
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

function cargarvendedores() {
  $.ajax({
    type: "POST",
    url: "php/llenar_tbl_vendedores.php",
    /*data: { //si hay que pasar un parametro
      
    },*/
    success: function (data) {
      $("#tb_body_vendedores").empty();
      $("#tb_body_vendedores").append(data);
    }
  })
}

function vendedor_delete(id) {
  Swal.fire({
    title: 'Eliminar Vendedor',
    text: "¿Desea Eliminar este Vendedor?",
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
        url: "php/delete_vendedor.php",
        data: {
          'Id': id
        },
        success: function (data) {
          cargarvendedores();
        }
      })
    }
  })
}

$(document).on('click', '#addVendedor', function (event) {
  clearfields();
});