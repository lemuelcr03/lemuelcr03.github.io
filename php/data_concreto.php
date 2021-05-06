<?php
include('connection.php');

if ($_GET) {
    $id = $_GET['Id'];
}
$query = "SELECT * FROM concretos where Id= " . $id;
$result = mysqli_query($connection, $query);
$filas = mysqli_num_rows($result);
if ($filas == 1) {
    $row = mysqli_fetch_array($result);
    $Tipo = $row['Tipo'];
    $Resistencia = $row['Resistencia'];
    $Bomba = $row['Bomba'];
    $Precio = $row['Precio'];
    echo json_encode($row);
}
