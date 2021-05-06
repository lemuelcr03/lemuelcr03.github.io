<?php
ob_start();
include("connection.php");
include("pdf/fpdf.php");
//$id = $_GET["id"];
class PDF extends FPDF{}
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->SetMargins(5,5,5);
$pdf->AddPage();
$pdf->SetAutoPageBreak(false);
$pdf->Image('../images/LogoNew.png', 5, 5, 50);
$pdf->SetFont('Helvetica', 'B', 17);
$pdf->Cell(80);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y + 15);
$pdf->SetX($x + 0);
$pdf->Cell(40, 25, utf8_decode('COTIZACIÓN'), 0, 0, 'C');
$pdf->SetFont('Helvetica', 'I', 9);
$pdf->Cell(60);
$consulta = "SELECT DATE_FORMAT(Fecha,'%d/%m/%Y')Fecha FROM solicitudes WHERE Id=1";
$resultado = mysqli_query($connection, $consulta);
while ($row = $resultado->fetch_assoc()) {
$pdf->Cell(30, 10, $row["Fecha"], 0, 0, 1);
}
$pdf->Ln(20);// Salto de línea
$consulta = "SELECT * from solicitudes WHERE Id=1";
$resultado = mysqli_query($connection, $consulta);
while ($row = $resultado->fetch_assoc()) {
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y + 5);
$pdf->SetX($x + 0);
$pdf->SetFont('Times', 'B', 13);
$pdf->SetFillColor(46, 81, 152);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(125, 5, utf8_decode('Información del Cliente'), 0, 1, 'L', true);
$pdf->SetFont('Times', '', 12);
$pdf->SetTextColor(0, 0, 0);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y + 0);
$pdf->SetX($x + 0);
$pdf->SetFont('Times', 'B', 12);
$pdf->Cell(30, 5, 'Cliente:', 0, 1, 'L', false);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Times', '', 12);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y - 5);
$pdf->SetX($x + 30);
$pdf->Cell(95, 5, utf8_decode($row["Obra"]), 0, 1, 'L');
$pdf->SetFont('Times', 'B', 12);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y + 0);
$pdf->SetX($x + 0);
$pdf->SetTextColor(0, 0, 0);
$pdf->Cell(30, 5, utf8_decode('Concreto'), 0, 1, 'L', false);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y - 5);
$pdf->SetX($x + 30);
$pdf->SetTextColor(0, 0, 0);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y + 0);
$pdf->SetX($x + 0);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Times', 'B', 12);
$pdf->Cell(30, 5, utf8_decode('Total Afiliados'), 0, 1, 'L', false);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y - 5);
$pdf->SetX($x + 30);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Times', '', 12);
$pdf->Cell(10, 5, utf8_decode($row['Obra']), 0, 1, 'L');
}

$pdf->MultiCell(125, 5, utf8_decode('*Esta cotización tiene una vigencia de 15 días a partir de la fecha.'."\n".'Nos reservamos el derecho de aceptar continuidad de cobertura.'), 0, 'L', false);
$consulta = "SELECT * from solicitudes 
where Id=1";
$resultado = mysqli_query($connection, $consulta);
while ($row = $resultado->fetch_assoc()) {
    $name=$row["Fecha"]; //saca el Usuario
    //$nombre_lista=explode(".",$name); //separa por el punto
    //$nombre=$nombre_lista[0].' '.$nombre_lista[1]; //une el nombre y apellido pero los separa con un espacio
    //$nom_ape=ucwords($nombre); //primera letra en mayúscula de cada palabra
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('Times', '', 10);
    $pdf->SetY(-35);
    $pdf->SetX(5);
    $pdf->Cell(200, 5, utf8_decode('Cotizado por: .$nom_ape'),0, 1, 'C');
    $y = $pdf->GetY();
    $x = $pdf->GetX();
    $pdf->SetY($y + 0);
    $pdf->SetX($x + 0);
    $pdf->Cell(200, 5, utf8_decode('Futuro ARS .$row["Sucursal"]'), 0, 1, 'C');
    $y = $pdf->GetY();
    $x = $pdf->GetX();
    $pdf->SetY($y + 0);
    $pdf->SetX($x + 0);
}
$pdf->Output();
?>