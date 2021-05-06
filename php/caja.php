<?php include('header.php') ?>

<body>
    <?php include('navbar.php') ?>
    <?php include('sidebar.php') ?>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <section class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <h1 class="font-weight-bold mb-0">
                            Movimientos de Caja

                        </h1>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <div class="row">

                            <div class="col-lg-3 offset-md-1">
                                <h4 class="text-muted"><i class="fas fa-dollar-sign"></i> Dinero en Caja</h4>
                                <h3 class="font-weight-bold" id="caja">
                                    $125,000
                                </h3>
                            </div>

                            <div class="col-lg-3 offset-md-1">
                                <h4 class="text-muted"><i class="fas fa-download"></i> Ingresos</h4>
                                <h3 class="font-weight-bold" id="ingresos">20,500</h3>
                            </div>

                            <div class="col-lg-3 offset-md-1">
                                <h4 class="text-muted"><i class="fas fa-upload"></i> Egresos</h4>
                                <h3 class="font-weight-bold" id="egresos">55,500</h3>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Movimiento</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Concepto</th>
                            </tr>
                        </thead>
                        <tbody id="tb_body_Caja">

                            <?php
                            //require('connection.php');

                            //include('llenar_tbl_caja.php');
                            ?>

                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    </main>
    <?php include('footer.php') ?>