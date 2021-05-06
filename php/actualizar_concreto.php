<?php
include("php/connection.php");

if ($_POST) {
    $array_list = [
        $_POST['Id'],
        $_POST['Tipo'],
        $_POST['Resistencia'],
        $_POST['Precio'],
        $_POST['Bomba']
    ];
    for ($i = 0; $i < count($array_list); $i++) {

        if (trim($array_list[$i] == '' || $array_list[$i] == '' || $array_list[$i] == null || strlen($array_list[$i]) == 0)) {
            echo ('Vacio');
            exit();
        }
    }
    $query = "UPDATE concretos SET Tipo='" . $array_list[1] . "',Resistencia='" . $array_list[2] . "',Precio=" . $array_list[3] . ",Bomba=" . $array_list[4] . " WHERE Id=" . $array_list[0];
    $result = mysqli_query($connection, $query);
    $mensaje = 'Completado';
    echo ($mensaje);
    if (!$result) {
        mysqli_error($connection);
    }
}
