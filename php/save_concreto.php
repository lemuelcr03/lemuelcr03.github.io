<?php
include('connection.php');

if ($_POST) {
    $array_list = [
        $tipo = $_POST['Tipo'],
        $resistencia = $_POST['Resistencia'],
        $bomba = $_POST['Bomba'],
        $precio = $_POST['Precio']
    ];
    $query = "INSERT INTO concretos(Tipo,Resistencia,Bomba,Precio) VALUES ('$tipo','$resistencia','$bomba','$precio')";
    $result = mysqli_query($connection, $query);
    $id = mysqli_insert_id($connection);

    $mensaje = "Completado-" . $id;
    echo ($mensaje);
    if (!$result) {
        die("Query Failed");
    }
}
