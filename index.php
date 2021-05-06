<?php include('header.php') ?>

<body onload="startTime()">
    <?php include('navbar.php') ?>
    <?php include('sidebar.php') ?>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <section class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <h1 class="font-weight-bold mb-0">
                            ¡Bienvenido Bryan!
                            <p class="lead text-muted">Aquí tienes la información más reciente</p>
                        </h1>
                    </div>
                    <div class="col-lg-3">
                        <h4 class="font-weight-bold" id="reloj">
                        </h4>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">

                            <div class="col-lg-3 bg-success text-light text-center">
                                <h4 class="text-muted-light"><i class="fas fa-user"></i> Clientes</h4>
                                <h3 class="font-weight-bold">16</h3>
                            </div>

                            <div class="col-lg-3 bg-primary text-light text-center">
                                <h4 class="text-muted-light"><i class="fas fa-file-invoice-dollar"></i> Préstamos Activos</h4>
                                <h3 class="font-weight-bold">13</h3>
                            </div>

                            <div class="col-lg-3 bg-secondary text-light text-center">
                                <h4 class="text-muted-light"><i class="fas fa-money-bill-alt"></i> Monto Pendiente</h4>
                                <h3 class="font-weight-bold">$150,000</h3>
                            </div>

                            <div class="col-lg-3 bg-info text-light text-center">
                                <h4 class="text-muted-light"><i class="fas fa-hand-holding-usd"></i> Movimientos</h4>
                                <h3 class="font-weight-bold">7</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <?php include('footer.php') ?>

    <script>
        function startTime() {
            var today = new Date();
            var d = today.getDate();
            var month = today.getMonth();
            var y = today.getFullYear();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById('reloj').innerHTML =
                d + "/" + month + "/" + y + "  " + h + ":" + m + ":" + s;
            var t = setTimeout(startTime, 500);
        }

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i
            }; // add zero in front of numbers < 10
            return i;
        }
    </script>