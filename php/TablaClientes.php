<div>
  <table class="table">
    <thead class="thead-light">
      <!-- Quitar la clase para quitar color de fondo del encabezado-->
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Contacto</th>
        <th scope="col">Préstamos Pendientes</th>
        <th scope="col"><button id="addConcreto" type="submit" class="btn btn-light" data-toggle="modal" data-target="#myModal">
        <i class="fas fa-plus"></i>
          </button></th>
      </tr>
    </thead>
    <tbody id="tb_body_clientes">

    <?php
      //require('connection.php');

      include('llenar_tbl_clientes.php');
      ?>

    </tbody>
  </table>
</div>

<script src="../js/Clientes.js"></script>