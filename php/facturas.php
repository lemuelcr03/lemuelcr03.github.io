<?php include("connection.php")?>
<?php session_unset()?>
<?php include('header.php') ?>




<!-- Page Content -->
<section class="py-3">
    <div class="container">
        <div class="row">
            <div class="col-lg-9">
                <h3 class="font-weight-bold mb-0">
                    Listado de Facturas
                </h3>
            </div>
        </div>
    </div>
</section>


<?php include("TablaFacturas.php") ?>
<!--End Content-->




<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Factura</h2>
            </div>

            <div class="modal-body">
                <div class="container" id="contenido">

                </div>
            </div>
        </div>
    </div>
</div>
</div>
<?php include('footer.php') ?>
<script src="../js/Factura.js"></script>