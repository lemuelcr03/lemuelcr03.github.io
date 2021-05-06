$(document).on('click', '#btn_save', function (event) {
  event.preventDefault();

  if ($("#inputConcreto").val() != null && $("#inputConcreto").val() != "") {
    if (localStorage.getItem('Id') > 0) {
      //console.log(localStorage.getItem('Id'));
      Swal.fire({
        title: '¿Desea Actualizar Datos?',
        text: "Se Actualizará la información del Concreto",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {

          tipo = $("#inputConcreto").val();
          resistencia = $("#txtRes").val();
          precio = $("#txtPrecio").val();
          bomba = $("#CheckBomba").prop("checked");

          $.ajax({
            type: "POST",
            url: "actualizar_concreto.php",
            data: {
              'Id': localStorage.getItem('Id'),
              'Tipo': tipo,
              'Resistencia': resistencia,
              'Precio': precio,
              'Bomba': bomba
            },
            success: function (data) {
              if (data == 'Vacio') { //Verifica el resultado
                Swal.fire({
                  type: 'error',
                  title: 'Validación',
                  text: 'Debe completar todos los campos'
                })
              } else

                cargarconcretos();
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
        text: "Se Creará un nuevo tipo de Concreto",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {

          Tipo = $("#inputConcreto").val();
          Resistencia = $("#txtRes").val();
          Precio = $("#txtPrecio").val();
          Bomba = $("#CheckBomba").prop("checked");
          $.ajax({
            type: "POST",
            url: "save_concreto.php",
            data: {
              'Tipo': Tipo,
              'Resistencia': Resistencia,
              'Bomba': Bomba,
              'Precio': ((Precio - 900) - (Precio * 0.18))
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
                cargarconcretos();
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
  $('#inputConcreto').val(-1);
  $('#txtRes').val('');
  $("#CheckBomba").prop("checked", false);
  $('#txtPrecio').val('');
};

function concreto_info(id) {
  clearfields();
  localStorage.setItem('Id', id); //asignamos id de la obra a variable global
  $.ajax({
    type: "GET",
    url: "data_concreto.php",
    data: {
      'Id': id
    },
    success: function (data) {

      dataJson = JSON.parse(data);
      console.log(dataJson.Bomba);
      $("#inputConcreto").val(dataJson.Tipo);
      $("#txtRes").val(dataJson.Resistencia);
      //Validar si lleva Bomba y Colocación
      if (parseInt(dataJson.Bomba) == 1) {
        $("#CheckBomba").prop("checked", true);
      } else {
        $("#CheckBomba").prop("checked", false);
      }
      $("#txtPrecio").val(dataJson.Precio);
    }
  })
};

function cargarconcretos() {
  $.ajax({
    type: "POST",
    url: "llenar_tbl_concretos.php",
    /*data: { //si hay que pasar un parametro
      
    },*/
    success: function (data) {
      $("#tb_body_concretos").empty();
      $("#tb_body_concretos").append(data);
    }
  })
}

function concreto_delete(id) {
  Swal.fire({
    title: 'Eliminar Concreto',
    text: "¿Desea Eliminar este Concreto?",
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
        url: "delete_Concreto.php",
        data: {
          'Id': id
        },
        success: function (data) {
          cargarconcretos()
        }
      })
    }
  })
}

$(document).on('click', '#addConcreto', function (event) {
  clearfields();
  localStorage.setItem("Id", null);
});