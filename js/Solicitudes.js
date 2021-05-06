$(document).on('click', '#btn_save', function (event) {
  event.preventDefault();

  // if ($("#inputObra").val() != null && $("#inputObra").val() != 0) {
  if (localStorage.getItem('Id') > 0) {
    //console.log(localStorage.getItem('Id'));
    Swal.fire({
      title: '¿Desea Actualizar Datos?',
      text: "Se Actualizará la información de la Solicitud",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Id=localStorage.getItem('Id');
        Obra = $("#inputObra").val();
        Concreto = $("#inputConcreto").val();
        Cantidad = $("#txtSol").val();
        Bomba = $("#CheckBomba").prop('checked');
        GravaS = $("#CheckGS").prop('checked');
        GravaC = $("#CheckGC").prop('checked');
        Grava3_8 = $("#Check38").prop('checked');
        Grava3_4 = $("#Check34").prop('checked');
        Grava_1 = $("#Check1").prop('checked');
        Acel = $("#CheckAc").prop('checked');
        Plast = $("#CheckPlast").prop('checked');
        Ret = $("#CheckRet").prop('checked');
        Imp = $("#CheckImp").prop('checked');
        Rev = $("#inputRev").val();

        //console.log(Obra,Concreto,Cantidad,Bomba,Silicea,Caliza,Grava1,Grava34,Grava38,Acel,Ret,Plast,Rev);
        $.ajax({
          type: "POST",
          url: "actualizar_solicitud.php",
          data: {
            'Id': localStorage.getItem('Id'),
            'Obra': Obra,
            'Concreto': Concreto,
            'Cantidad': Cantidad,
            'Bomba': Bomba,
            'GravaS': GravaS,
            'GravaC': GravaC,
            'Grava3_8': Grava3_8,
            'Grava3_4': Grava3_4,
            'Grava_1': Grava_1,
            'Acel': Acel,
            'Plast': Plast,
            'Ret': Ret,
            'Imp': Imp,
            'Rev': Rev
          },
          success: function (data) {
            if (data == 'Vacio') { //Verifica el resultado
              Swal.fire({
                type: 'error',
                title: 'Validación',
                text: 'Debe completar todos los campos'
              })
            } else

            cargarsolicitudes();
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
      text: "Se Creará una Nueva Solicitud",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Obra = $("#inputObra").val();
        Concreto = $("#inputConcreto").val();
        Cantidad = $("#txtSol").val();
        Bomba = $("#CheckBomba").prop('checked')
        Silicea = $("#CheckGS").prop('checked')
        Caliza = $("#CheckGC").prop('checked')
        Grava1 = $("#Check1").prop('checked')
        Grava34 = $("#Check34").prop('checked')
        Grava38 = $("#Check38").prop('checked')
        Acel = $("#CheckAc").prop('checked')
        Plast = $("#CheckPlast").prop('checked')
        Ret = $("#CheckRet").prop('checked')
        Rev = $("#inputRev").val();
        //console.log(Obra, Concreto, Cantidad, Bomba, Silicea, Caliza, Grava1, Grava34, Grava38, Acel, Plast, Rev);
        $.ajax({
          type: "POST",
          url: "save_solicitud.php",
          data: {
            'Obra': Obra,
            'Concreto': Concreto,
            'Cantidad': Cantidad,
            'Bomba': Bomba,
            'Silicea': Silicea,
            'Caliza': Caliza,
            'Grava1': Grava1,
            'Grava34': Grava34,
            'Grava38': Grava38,
            'Acel': Acel,
            'Plast': Plast,
            'Rev': Rev,
            'Ret': Ret
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

              /*
              Swal.fire({
                type: 'success',
                title: 'Validación',
                text: 'Servicio Agregado Correctamente'
              })
              */
              cargarsolicitudes();
              clearfields();
              $("#myModal").modal('hide');
            }
          }
        })
      }
    })
  }
  //}
});

function clearfields() {
  $('#inputObra').val(-1);
  $('#inputConcreto').val(-1);
  $("#CheckBomba").prop("checked", false);
  $('#txtSol').val('');
  $("#CheckGS").prop("checked", false);
  $("#CheckGC").prop("checked", false);
  $("#Check1").prop("checked", false);
  $("#Check34").prop("checked", false);
  $("#Check38").prop("checked", false);
  $("#CheckAc").prop("checked", false);
  $("#CheckPlast").prop("checked", false);
  $("#CheckRet").prop("checked", false);
  $("#inputRev").val();
};

function hasBomba(id) {
  $.ajax({
    type: "GET",
    url: "data_concreto.php",
    data: {
      'Id': id
    },
    success: function (data) {

      dataJson = JSON.parse(data);
      //Validar si lleva Bomba y Colocación
      if (parseInt(dataJson.Bomba) == 1) {
        $("#CheckBomba").prop("checked", true);
      } else {
        $("#CheckBomba").prop("checked", false);
      }
    }
  })
};

var factura = false;

function crear_factura(id) {
  $.ajax({
    type: "GET",
    url: "data_solicitudF.php",
    data: {
      'Id': id
    },
    success: function (data) {

      dataJson = JSON.parse(data);
      //Validar si se ha enviado todo
      if (parseInt(dataJson.Total) == 0) {
        Swal.fire(
          'Factura',
          'Factura Creada',
          'success' )
      } else {
        Swal.fire(
          'Error al crear la Factura',
          'Quedan '+ dataJson.Total+' Mt³ por enviar',
          'error'
        )
      }
    }
  })
};

function solicitud_info(id) {
  clearfields();
  localStorage.setItem('Id', id); //asignamos id de la obra a variable global
  $.ajax({
    type: "GET",
    url: "data_solicitud.php",
    data: {
      'Id': id
    },
    success: function (data) {
      dataJson = JSON.parse(data);
      $("#inputObra").val(dataJson.Obra);
      $("#inputConcreto").val(dataJson.Concreto);
      $("#txtSol").val(dataJson.Cantidad);

      if (parseInt(dataJson.Bomba) == 1) {
        $("#CheckBomba").prop("checked", true);
      }
      if (parseInt(dataJson.GravaS) == 1) {
        $("#CheckGS").prop("checked", true);
      }
      if (parseInt(dataJson.GravaC) == 1) {
        $("#CheckGC").prop("checked", true);
      }
      if (parseInt(dataJson.Grava_1) == 1) {
        $("#Check1").prop("checked", true);
      }
      if (parseInt(dataJson.Grava3_4) == 1) {
        $("#Check34").prop("checked", true);
      }
      if (parseInt(dataJson.Grava3_8) == 1) {
        $("#Check38").prop("checked", true);
      }
      if (parseInt(dataJson.Acel) == 1) {
        $("#CheckAc").prop("checked", true);
      }
      if (parseInt(dataJson.Plast) == 1) {
        $("#CheckPlast").prop("checked", true);
      }
      if (parseInt(dataJson.Ret) == 1) {
        $("#CheckRet").prop("checked", true);
      }
      $("#inputRev").val(dataJson.Rev);
    }
  })
};

function cargarsolicitudes() {
  $.ajax({
    type: "POST",
    url: "llenar_tbl_solicitudes.php",
    /*data: { //si hay que pasar un parametro
      
    },*/
    success: function (data) {
      $("#tb_body_solicitudes").empty();
      $("#tb_body_solicitudes").append(data);
    }
  })
}

function solicitud_delete(id) {
  Swal.fire({
    title: 'Eliminar Solicitud',
    text: "¿Desea Eliminar esta Solicitud?",
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
        url: "delete_Solicitud.php",
        data: {
          'Id': id
        },
        success: function (data) {
          cargarsolicitudes();
        }
      })
    }
  })
}

$('#inputConcreto').change(function () {
  hasBomba($('#inputConcreto').val());
});

$(document).on('click', '#addSol', function (event) {
  clearfields();
  localStorage.setItem("Id", null);
});