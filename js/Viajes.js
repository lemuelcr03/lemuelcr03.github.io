$(document).on('click', '#btn_save', function (event) {
  event.preventDefault();
  //Validar
  Swal.fire({
    title: '¿Desea Guardar?',
    text: "Se Agregará este Viaje a la Solicitud",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.value) {

      IdSol = localStorage.getItem('Id');
      console.log(IdSol);
      Cantidad = $("#inputCantidad").val();
      Conductor = $("#inputConductor").val();

      $.ajax({
        type: "POST",
        url: "save_viaje.php",
        data: {
          'Solicitud': IdSol,
          'Cantidad': Cantidad,
          'Conductor': Conductor

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
            cargarviajes();
            clearfields();
            $("#myModal").modal('hide');
            Swal.fire({
              title: 'Imprimir Conduce',
              text: "¿Desea Imprimir este Conduce?",
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si',
              cancelButtonText: 'No'
            }).then((result) => {
              if ((result.value)) {
                //proceso de carga de Conduce
                if (data.split("-")[0] == 'Completado') { //Verifica el resultado de guardar.php
                  var id_conduce = data.split("-")[1];
                  GenerarPDF(id_conduce);
                  $("#myModal3").modal('show');
                }
              }
            })
          }
        }
      })
    }
  })
});

function clearfields() {
  $('#txtObra').val('');
  $('#txtConcreto').val('');
  $('#inputCantidad').val(-1);
  $('#inputConductor').val(-1);
  localStorage.setItem('Id', null);
};

/*
function add_viaje(id) {
  clearfields();
  localStorage.setItem('IdSol', id);
  $.ajax({
    type: "GET",
    url: "php/CRUD/data_viaje.php",
    data: {
      'IdSol': id
    },
    success: function (data) {
      dataJson = JSON.parse(data);
      $("#txtConcreto").val(dataJson.Concreto);
      $("#txtObra").val(dataJson.Obra);
    }
  })
};
*/


function cargarviajes() {
  $.ajax({
    type: "POST",
    url: "llenar_tbl_viajes.php",
    /*data: { //si hay que pasar un parametro
      
    },*/
    success: function (data) {
      $("#tb_body_viajes").empty();
      $("#tb_body_viajes").append(data);
    }
  })
}

function cargar_desc_viajes(id) {
  $.ajax({
    type: "GET",
    url: "TablaViajesDesc.php",
    data: {
      'idSol': id
    },
    success: function (data) {
      $("#tb_body_viajes_desc").empty();
      $("#tb_body_viajes_desc").append(data);
    }
  })
};

function viaje_delete(idV, idS) {
  Swal.fire({
    title: 'Eliminar Viaje',
    text: "¿Desea Eliminar este Viaje?",
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
        url: "delete_Viaje.php",
        data: {
          'Id': idV
        },
        success: function (data) {
          cargar_desc_viajes(idS);
          cargarviajes();
        }
      })
    }
  })
}

function viaje_info(id) {
  localStorage.setItem('Id', id); //asignamos id de la obra a variable global
  $.ajax({
    type: "GET",
    url: "data_Viaje.php",
    data: {
      'IdSol': id
    },
    success: function (data) {
      dataJson = JSON.parse(data);
      $("#txtObra").val(dataJson.Obra);
      $("#txtConcreto").val(dataJson.Concreto);
      var solicitado = parseFloat(dataJson.Solicitado);
      var enviado = parseFloat(dataJson.Enviado);
      var total = solicitado - enviado;
      if (total > 0) {

        if (total < 9) {
          for (var i = 0.5, l = total + 0.5; i < l; i += 0.5) {

            $('#inputCantidad').append(new Option(i, i))
          }
        } else {
          for (var i = 0.5, l = 9.5; i < l; i += 0.5) {

            $('#inputCantidad').append(new Option(i, i))
          }
        }
      } else {
        Swal.fire({
          type: 'error',
          title: 'Solicitud Completada',
          text: 'Se ha enviado la cantidad Solicitada',
          cancelButtonText: 'Ok'
        }).then((result) => {
        $("#myModal").modal('hide');
      });
    }
    }
  })
  clearfields();
};

function GenerarPDF(id) {
  $("#pdf").html('<embed src="conduce.php?id=' + id + '" frameborder="0" width="100%" height="500px">');

}