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

    <title>Gold Concrete</title>
    <?php require('connection.php'); ?>
</head>

<body>
    <?php include('../navbar.php') ?>
    <?php include('sidebar.php') ?>


    <!-- Tabla se carga desde JS -->
    <!-- Modal -->

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div id="principal">
            <div class="card-body">
                <div class="col-md-12"> </div>

                <div class="container">
                    <h4 class="col-md-12">Listado de Obras</h4>
                    <?php include("TablaObras.php") ?>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="myModal" role="dialog">

                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2>Información de la Obra</h2>
                            </div>

                            <div class="modal-body">
                                <div class="container">
                                    <form method="POST">
                                        <div class="form-group">
                                            <label for="txtObra">Obra</label>
                                            <input type="text" class="form-control" name="Obra" id="txtObra">
                                        </div>
                                        <div class="form-group">
                                            <label for="txtRNC">RNC</label>
                                            <input type="text" class="form-control" name="RNC" id="txtRNC">
                                        </div>
                                        <div class="form-group">
                                            <label for="txtContacto">Contacto</label>
                                            <input type="text" class="form-control" name="Contacto" id="txtContacto">
                                        </div>
                                        <div class="form-group">
                                            <label for="txtDireccion">Direccion</label>
                                            <textarea class="form-control" name="Direccion" rows="3" id="txtDireccion"></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary" id="btn_save">Guardar</button>
                                    </form>
                                </div>
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
    <script src="../js/Obras.js"></script>
</body>

</html>