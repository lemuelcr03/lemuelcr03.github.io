<?php
session_unset();
    if(!isset($_SESSION)) //si no existe una sesion, la crea
    { 
        session_start(); 
    } 


$connection = mysqli_connect(
'localhost','root','','prestamos');
$error=mysqli_error($connection);
if (isset ($connection))    //--si existe la conexión 
{
    /*--------echo 'DB is connected' .$error;   */
}
else{
    echo 'DB not connected' .$error;
}
/*  --------verificar que la conexion se esta ejecutando */

/*
($dbhost,$dbuser,$dbpass,$dbname)

$error=mysqli_error($conn);

if (isset ($conn))    //--si existe la conexión 
{
    echo 'DB is connected' .$error;
}
else{
    echo 'DB not connected' .$error;
}
*/
