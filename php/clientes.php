<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="../js/jquery-3.4.1.min.js"></script>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">

    <title>S. F. Mena</title>
    <?php require('connection.php'); ?>
</head>

<body>
    <?php include('navbar.php') ?>
    <?php include('sidebar.php') ?>


    <!-- Tabla se carga desde JS -->
    <!-- Modal -->

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div id="principal">
            <div class="card-body">
                <h4 class="col-md-8 offset-md-2">Listado de Clientes</h4>
                <div class="form-row col-md-12">
                    <input type="text" class="form-control col-md-6" placeholder="Filtrar" id="txtFiltroA">

                    <button type="submit" class="btn btn-success col-md-1 float-right offset-md-5" id="btn_filtrarA">Filtrar</button>
                </div>
                <div class="col-md-12"> </div>

                <div class="container">
                    <?php include("TablaClientes.php") ?>
                </div>

                <div class="modal fade" id="myModal" role="dialog">

                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2>Información del Cliente</h2>
                            </div>

                            <div class="modal-body">
                                <div class="container">
                                    <form method="POST">

                                        <div class="form-group">
                                            <label for="txtNombre">Nombre</label>
                                            <input type="text" class="form-control" id="txtNombre">
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group col-md-5">
                                                <label for="SelectCargo">Tipo Ident.</label>
                                                <select id="SelectCargo" class="form-control">
                                                    <option value="C" selected>Cédula</option>
                                                    <option value="P">Pasaporte</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-7">
                                                <label for="txtIdent">Identificacion</label>
                                                <input type="text" class="form-control" id="txtIdent">
                                            </div>

                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-5">
                                                <label for="dateEntrada">Fec. Nac.</label>
                                                <input class="form-control" type="date" id="dateEntrada">
                                            </div>
                                            <div class="form-group col-md-7">
                                                <label for="txtCont">Contacto</label>
                                                <input type="text" class="form-control" id="txtCont">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">@</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Correo Electrónico" aria-label="Mail" aria-describedby="basic-addon1">
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-check">
                                                <label class="form-check-label" for="CheckAct">
                                                    <input class="form-check-input" type="checkbox" id="CheckAct">
                                                    Activo
                                                </label>
                                            </div>
                                        </div>


                                </div>
                                <div class="form-row float-right">

                                    <button type="submit" class="btn btn-primary" id="btn_save">Guardar</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" id="myModal2" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="container">
                                <?php include("_TablaPuestos.php") ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </main>
    </div>
    </div>

    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="../js/icons.js"></script>
    <script src="../js/Agentes.js"></script>
</body>

</html>