/*
function getInfo(id, nombre) {
    localStorage.setItem('IdPuesto', id);
    //localStorage.setItem('Puesto',nombre);
    $("#myModal4").modal('hide');
    $("#txtPuesto").val(nombre);
}
*/

$(document).on('change', '#SelectZona', function (event) {
    event.preventDefault();
    var id = $("#SelectZona").val();
    FillClientes(id);
    document.getElementById('SelectCliente').disabled = false;
});

function FillClientes(id) {
    $.ajax({
        type: "POST",
        url: "llenar_select_clientes.php",
        data: {
            f: id
        },
        success: function (data) {
            //console.log(data);
            $("#SelectCliente").empty();
            $("#SelectCliente").append(data);
        }
    })

}

$(document).on('click', '#btn_filtrarR', function (event) {
    event.preventDefault();
    cargarPuestosF();
});


window.onload = cargarPuestos();


function cargarPuestos() {
    $.ajax({
        type: "POST",
        url: "llenar_tbl_puestos.php",
        data: { //si hay que pasar un parametro
            //IdProceso: idProceso
        },
        success: function (data) {
            $("#tb_body_Puesto").empty();
            $("#tb_body_Puesto").append(data);
        }
    })
}

function cargarPuestosF() {
    var id = $("#SelectCliente").val();
    $.ajax({
        type: "POST",
        url: "llenar_tbl_puestos2.php",
        data: { //si hay que pasar un parametro
            f: id
        },
        success: function (data) {
            $("#tb_body_Puesto").empty();
            $("#tb_body_Puesto").append(data);
        }
    })
}


function puesto_delete(id) {

    Swal.fire({
        title: 'Feriados',
        text: "¿Desea Eliminar Este Puesto?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {


            $.ajax({
                type: "POST",
                url: "del_puesto.php",
                data: {
                    'Id': id
                },
                success: function (data) {
                    //console.log(data);
                    $("#myModal").modal('hide');
                    cargarPuestos();
                }
            })
            clearfields();
        }
    })
}


function puesto_info(id) {
    clearfields();
    localStorage.setItem('IdPuesto', id);
    $.ajax({
        type: "GET",
        url: "data_puesto.php",
        data: {
            'Id': id
        },
        success: function (data) {
            console.log(data);
            dataJson = JSON.parse(data);
            $("#txtSede").val(dataJson.IdSede);
            $("#txtPuesto").val(dataJson.Puesto);
            $("#txtCodigo").val(dataJson.Codigo);
            $("#SelectZona").val(dataJson.IdZona);
            $("#txtHoras").val(dataJson.Horas);
            $("#txtFlota").val(dataJson.Flota);
        }
    })
};

function clearfields() {
    $("#txtSede").val('');
    $("#txtPuesto").val('');
    $("#txtCodigo").val('');
    $("#SelectZona").val(0);
    $("#txtHoras").val('');
    $("#txtFlota").val('');
    localStorage.clear();
}

$(document).on('click', '#btn_save', function (event) {
    event.preventDefault();

    if (localStorage.getItem('IdPuesto') > 0) {
        Swal.fire({
            title: '¿Desea Actualizar Datos?',
            text: "Se Actualizará la información del Agente",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.value) {
                id = localStorage.getItem('IdPuesto');
                puesto = $("#txtPuesto").val();
                codigo = $("#txtCodigo").val();
                sede = $("#txtSede").val();
                zona = $("#SelectZona").val();
                horas = $("#txtHoras").val();
                flota = $("#txtFlota").val();
                $.ajax({
                    type: "POST",
                    url: "upd_puesto.php",
                    data: {
                        'Id': id,
                        'IdSede': sede,
                        'Puesto': puesto,
                        'Codigo': codigo,
                        'IdZona': zona,
                        'Horas': horas,
                        'Flota': flota
                    },
                    success: function (data) {
                        console.log(data);
                        if (data == 'Vacio') { //Verifica el resultado
                            Swal.fire({
                                type: 'error',
                                title: 'Validación',
                                text: 'Debe completar todos los campos'
                            })
                        } else

                            cargarPuestos();
                        clearfields();
                        $("#myModal").modal('hide');
                    }
                })
            }
        })
    } else {
        Swal.fire({
            title: '¿Desea Guardar?',
            text: "Se Creará un nuevo Agente",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.value) {

                newCod = $("#txtCod").val();
                ident = $("#txtIdent").val();
                nombre = $("#txtNombre").val();
                genero = $("#SelectGen").val();
                contacto = $("#txtCont").val();
                idcargo = $("#SelectCargo").val();
                idpuesto = localStorage.getItem('IdPuesto');
                diaL = $("#SelectDLibre").val();
                entrada = $("#dateEntrada").val();
                alert(entrada);
                $.ajax({
                    type: "POST",
                    url: "save_puesto.php",
                    data: {
                        'CodAgente': newCod,
                        'Identificacion': ident,
                        'Nombre': nombre,
                        'Genero': genero,
                        'Contacto': contacto,
                        'IdCargo': idcargo,
                        'IdPuesto': idpuesto,
                        'DiaL': diaL,
                        'FecEntrada': entrada
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

                            cargarPuestos();
                            clearfields();
                            $("#myModal").modal('hide');
                        }
                    }
                })
            }
        })
    }
    return false;
});