<?php
require('connection.php');

$query = "SELECT * FROM clientes";
$rs = mysqli_query($connection, $query);
$total_rows = mysqli_num_rows($rs);

if ($total_rows > 0) {
    while ($row = mysqli_fetch_array($rs)) {
        echo '<tr id=' . $row["Id_Cliente"] . '>
                <td class="filas">' . $row["Nombre"] . '</td> 
                <td class="filas">' . $row["Contacto"] . '</td> 
                <td class="filas">' . $row["Contacto"] . '</td> 
                <td><button class="btn btn-primary" id="btn_edit" onclick="cliente_info(' . $row["Id_Cliente"] . ')" data-toggle="modal" data-target="#myModal"> <i class="fas fa-edit"></i> </button>
                <button class="btn btn-danger" id="btn_delete" onclick="cliente_delete(' . $row["Id_Cliente"] . ')"> <i class="fas fa-trash-alt"></i> </button></td>
    </td>
    </tr>';
    }
} else {
    echo mysqli_error($connection);
}
