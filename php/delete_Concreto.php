<?php
include('connection.php');
if ($_POST) {
        $id=  $_POST['Id'];
        if (trim($id == '' || $id == null || $id== 0)) {
            echo ('Vacio');
            exit();
        }
    }
    $query = "DELETE FROM concretos WHERE Id=".$id;
    $result = mysqli_query($connection, $query);
    $mensaje='Completado ' .$id.' eliminado';
    echo ($mensaje);
    if (!$result) {
        mysqli_error($connection);
    }
