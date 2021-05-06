var excelEnt = null,
  excelSal = null;
var Identificacion, Agente, Entrada, Salida, Puesto, IdPuesto;

function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
//Alerta mientras se guardan los registros
function sendAlert() {
  $("#myModal").modal('show');
  insert_excel();
}

//Insertar información en la Base de Datos
function insert_excel() {
  var excelEnt = $("#txt_archivo").val();
  var excelSal = $("#txt_archivoSal").val();

  ficE = excelEnt.split('\\');
  fecEnt = ficE[ficE.length - 1];
  ficS = excelSal.split('\\');
  fecSal = ficS[ficS.length - 1];

  var contador = 0;
  var ident = new Array();
  var nombre = new Array();
  var entrada = new Array();
  var salida = new Array();
  var puesto = new Array();
  $("#TablaReg tbody tr").each(function () {
    ident.push($(this).find('td').eq(0).text());
    nombre.push($(this).find('td').eq(1).text());
    entrada.push($(this).find('td').eq(2).text());
    salida.push($(this).find('td').eq(3).text());
    puesto.push($(this).find('td').eq(5).text());
    contador++;
  })

  if (contador == 0) {
    Swal.fire({
      type: 'warning',
      title: 'Validación',
      text: 'Tabla Vacía'
    })
  }
  var jsonIdent = JSON.stringify(ident);
  var jsonNom = JSON.stringify(nombre);
  var jsonEnt = JSON.stringify(entrada);
  var jsonSal = JSON.stringify(salida);
  var jsonPue = JSON.stringify(puesto);
  /*
    $.ajax({
      type: "POST",
      //url: "save_regMasivo.php",
      url: "insert_agente.php",
      data: {
        'ident': jsonIdent,
        'nombre': jsonNom,
        'puesto': jsonPue
      },
      success: function (data) {
        console.log(data);
      }
    })
  */

  $.ajax({
    type: "POST",
    //url: "save_regMasivo.php",
    url: "save_regMasivo2.php",
    data: {
      'excE': fecEnt,
      'excS': fecSal,
      'Ident': jsonIdent,
      'Nombre': jsonNom,
      'Ent': jsonEnt,
      'Sal': jsonSal,
      'Puesto': jsonPue
    },
    success: function (data) {
      //console.log(data);
      $("#myModal").modal('hide');
      Swal.fire({
        title: 'Proceso de Carga Masiva',
        text: "Datos Insertados Correctamente",
        type: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          window.open("procesos.php", "_self"); //Abrir en misma ventana después de cerrar el mensaje
        }
      })
    }
  });
}

function cargar_excel() {
  excelEnt = $("#txt_archivo").val();
  excelSal = $("#txt_archivoSal").val();
  if (!!excelEnt && !!excelSal) {
    if (excelEnt == excelSal) {
      Swal.fire({
        type: 'error',
        title: 'Archivos Identicos',
        text: 'Seleccione Archivos Diferentes para Entrada y Salida'
      })
      $("#txt_archivo").val('');
      $("#txt_archivoSal").val('');
      excelEnt = null;
      excelSal = null;
    } else {
      var formdata = new FormData();
      var files = $("#txt_archivo")[0].files[0];
      formdata.append('archivoexcel', files);
      $.ajax({
        type: "POST",
        url: "import.php",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (resp) {
          $("#TablaReg_body").html(resp);
          var contador = 0;
          var ident = new Array();
          var nombre = new Array();
          var puesto = new Array();
          $("#TablaReg tbody tr").each(function () {
            ident.push($(this).find('td').eq(0).text());
            nombre.push($(this).find('td').eq(1).text());
            puesto.push($(this).find('td').eq(5).text());
            var id = $(this).find('td').eq(0).text();
            var _dia = $(this).find('td').eq(2).text();
            var dia = _dia.substr(8, 2);
            var sede = $(this).find('td').eq(5).text();

            SetPuesto(id + '' + dia, sede);
            contador++;
          })

          if (contador == 0) {
            Swal.fire({
              type: 'warning',
              title: 'Validación',
              text: 'Tabla Vacía'
            })
          }
          var jsonIdent = JSON.stringify(ident);
          var jsonNom = JSON.stringify(nombre);
          var jsonPue = JSON.stringify(puesto);

          $.ajax({
            type: "POST",
            //url: "save_regMasivo.php",
            url: "insert_agente.php",
            data: {
              'ident': jsonIdent,
              'nombre': jsonNom,
              'puesto': jsonPue
            },
            success: function (data) {
              //console.log(data);
              //changePuesto(key);

            }
          })
        }
      });
      //Información de Salida

      //var formdata = new FormData();
      files = $("#txt_archivoSal")[0].files[0];
      formdata.append('archivoexcel', files);
      $.ajax({
        type: "POST",
        url: "import_Sal.php",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (resp) {
          var x = resp.replace('"', '').split('""');
          var tam = parseInt(x.length);
          for (i = 0; i < tam; i++) {
            var z = x[i]; //posición del Array
            var y = z + ' '.split(',');
            m = y.split(",");
            var key = m[0];
            var value = m[1];
            changedataSal(key, value);
            changedataValues(key);
            //changePuesto(key);
          }
        }
      });

      document.getElementById('btn_Process').disabled = false;
    }
  }
}

function changedataSal(key, value) {
  if ($('#S' + key).html() != "undefined") {
    if ($('#S' + key).html() == '') {
      $('#S' + key).html(value);
    }
  }
}

function changedataInfo(key, value) {
  $(key).html(value);
}

function changedataValues(ident) {

  var ident2 = ident.slice(0, -2); //Quitar los 2 ultimos elementos (Día)

  $.ajax({
    type: "GET",
    url: "getInfoReg.php",
    data: {
      id: ident2
    },
    success: function (data) {
      if (!!data) {
        dataJson = JSON.parse(data);

        $('#N' + ident).html(dataJson.Nombre);
        $('#P' + ident).html(dataJson.Puesto);
        $('#IdP' + ident).html(dataJson.IdPuesto);

        /*
            if ($('#N' + ident).html() != "undefined") {
              if ($('#N' + ident).html() === '') {
                $('#N' + ident).html(dataJson.Nombre);
              }
            }

            if ($('#P' + ident).html() != "undefined") {
              if ($('#P' + ident).html() === '') {
                $('#P' + ident).html(dataJson.Puesto);
              }
            } 
            
            if ($('#IdP' + ident).html() != "undefined") {
              if ($('#IdP' + ident).html() === '') {
                $('#IdP' + ident).html(dataJson.IdPuesto);
              }
            }
           */
      }

    }
  })

  /*
    var idPuesto = $('#IdP' + ident).html();
    console.log('$(#IdP' + ident + ').html()=' + idPuesto);

    $.ajax({
      type: "GET",
      url: "getPuestoReg.php",
      data: {
        idp: idPuesto
      },
      success: function (data) {

        //if (!!data) {
        dataJson = JSON.parse(data);
        console.log(dataJson);
        changedataInfo('#P' + ident, data.Puesto);
        //}
      }
    })
  */

}

function changePuesto(id) {
  var idp = 0;
  if ($('#IdP' + id).html() != undefined) {
    idp = $('#IdP' + id).html();
    console.log(id);
    $.ajax({
      type: "GET",
      url: "getPuestoReg.php",
      //url: "getPuestoAge.php",
      data: {
        idp: idp
      },
      success: function (data) {
        if (data.length > 0) {
          dataJson = JSON.parse(data);
          $('#IdP' + id).html(dataJson.Id);
          $('#P' + id).html(dataJson.Nombre);
          //console.log(id+' '+dataJson[0]+' '+dataJson[1]);
        }
      }
    })
  }
}

function SetPuesto(id, key) {

  //Obtener el Nombre y el Id Correspondientes
  if (key.trim() == 0 || key.trim() == '' || key.trim() == undefined || key.trim() == null) {
    $.ajax({
      type: "GET",
      //url: "save_regMasivo.php",
      url: "getPuestoAge.php",
      data: {
        'id': id
      },
      success: function (data) {
        //console.log(data);
        dataJson = JSON.parse(data);
        $('#IdP' + id).html(dataJson.IdPuesto);
        $('#P' + id).html(dataJson.Puesto);
      }
    })
  } else {


    $.ajax({
      type: "GET",
      //url: "save_regMasivo.php",
      url: "getPuestoReg.php",
      data: {
        'id': key
      },
      success: function (data) {
        dataJson = JSON.parse(data);
        $('#IdP' + id).html(dataJson.Id);
        $('#P' + id).html(dataJson.Nombre);
      }
    })
  }
}

function clearfieldsM() {
  $("#txtAgente").val('');
  $("#txtPuesto").val('');
  $("#HoraEntrada").val();
  $("#HoraSalida").val();
  localStorage.clear();
}

function registroM_info(key, dia, CodEmp, Agente, Puesto, IdPuesto, Entrada, Salida) {
  clearfieldsM();
  $("#txtAgente").val(Agente);
  $("#txtPuesto").val(Puesto);
  localStorage.setItem('IdPuesto', IdPuesto);
  localStorage.setItem('CodEmp', CodEmp);
  localStorage.setItem('IdRegistro', key);
  localStorage.setItem('Dia', dia);
  $("#HoraEntrada").val(Entrada.substring(0, 16));
  $("#HoraSalida").val(Salida.substring(0, 16));
};

function getInfoP(id, nombre) {
  localStorage.setItem('IdPuesto', id);
  //localStorage.setItem('Puesto',nombre);
  $("#myModal4").modal('hide');
  $("#txtPuesto").val(nombre);
}

function getInfoA(id, nombre) {
  localStorage.setItem('CodEmp', id);
  //localStorage.setItem('Puesto',nombre);
  $("#myModal3").modal('hide');
  $("#txtAgente").val(nombre);
}

//Boton Editar de cada Fila
function btnEdit(idx) {
  var id = idx.toString();
  var Dia = id.slice(id.length - 2, id.length);
  var Cod = id.slice(0, id.length - 2);
  var CodEmp = padLeadingZeros(Cod, 4); //4 Caracteres de CodEmpleado
  var key = CodEmp + Dia;
  var nombre = $('#N' + key).html(); // Nombre
  var ent = $('#E' + key).html(); // Entrada
  var sal = $('#S' + key).html(); // Salida
  var puesto = $('#P' + key).html(); // Puesto
  var IdPuesto = $('#IdP' + key).html(); // IdPuesto
  $("#myModal2").modal('show');
  registroM_info(key, Dia, CodEmp, nombre, puesto, IdPuesto, ent, sal);
}

function cargarAgentes(filtro) {
  $.ajax({
    type: "POST",
    url: "_llenar_tbl_agentes.php",
    data: { //si hay que pasar un parametro
      f: filtro
    },
    success: function (data) {
      $("#tb_body_agentes").empty();
      $("#tb_body_agentes").append(data);
    }
  })
}

function cargarAgentes0() {
  $.ajax({
    type: "POST",
    url: "_llenar_tbl_agentes.php",
    /*data: { 
      f: filtro
    },*/
    success: function (data) {
      $("#tb_body_agentes").empty();
      $("#tb_body_agentes").append(data);
    }
  })
}

function cargarPuestos(filtro) {
  $.ajax({
    type: "POST",
    url: "_llenar_tbl_puestos.php",
    data: { //si hay que pasar un parametro
      f: filtro
    },
    success: function (data) {
      $("#tb_body_puestos").empty();
      $("#tb_body_puestos").append(data);
    }
  })
}

function cargarPuestos0() {
  $.ajax({
    type: "POST",
    url: "_llenar_tbl_puestos.php",
    /*data: { 
      f: filtro
    },*/
    success: function (data) {
      $("#tb_body_puestos").empty();
      $("#tb_body_puestos").append(data);
    }
  })
}

//Boton Puesto del Editor
$(document).on('click', '#btn_puesto', function (event) {
  event.preventDefault();
  return false;
});
//Boton Agente del Editor
$(document).on('click', '#btn_agente', function (event) {
  event.preventDefault();
  return false;
});

//Boton Guardar del Editor
$(document).on('click', '#btn_saveM', function (event) {
  event.preventDefault();
  CodEmp = localStorage.getItem('CodEmp');
  dia = localStorage.getItem('Dia');
  idRegistro = localStorage.getItem('IdRegistro');
  Identificacion = '' + CodEmp + '' + dia;
  Agente = $("#txtAgente").val();
  Puesto = $("#txtPuesto").val();
  Entrada = $("#HoraEntrada").val();
  Salida = $("#HoraSalida").val();
  IdPuesto = localStorage.getItem('IdPuesto');
  changedataInfo('#' + idRegistro, CodEmp);
  changedataInfo('#N' + idRegistro, Agente);
  changedataInfo('#E' + idRegistro, Entrada);
  changedataInfo('#S' + idRegistro, Salida);
  changedataInfo('#P' + idRegistro, Puesto);
  changedataInfo('#IdP' + idRegistro, IdPuesto);
  $("#myModal2").modal('hide');
  clearfieldsM();
  return false;
});

$(document).on('click', '#btn_Process', function (event) {
  event.preventDefault();
  Swal.fire({
    title: 'Proceso de Carga Masiva',
    text: "¿Desea Guardar Información?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.value) {
      sendAlert();
    }
  })
  return false;
});

$(document).on('click', '#btn_filtrarA', function (event) {
  event.preventDefault();
  var f = $("#txtFiltroA").val();
  if (f == "") {
    cargarAgentes0();
  } else {
    cargarAgentes(f);
  }
});

$(document).on('click', '#btn_filtrarP', function (event) {
  event.preventDefault();
  var f = $("#txtFiltroP").val();
  if (f == "") {
    cargarPuestos0();
  } else {
    cargarPuestos(f);
  }
});