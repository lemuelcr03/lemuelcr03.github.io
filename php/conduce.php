<?php

ob_start();
include("connection.php");
include("../pdf/fpdf.php");

$id = $_GET["id"];
//$id = 2;
class PDF extends FPDF
{
}


$consulta = "SELECT LPAD(V.Id, 6, '0')as NumConduce,DATE_FORMAT(V.Fecha,'%d-%c-%Y')as Fecha,DATE_FORMAT(V.Fecha,'%r')as Hora,C.Nombre as Conductor FROM viajes V
JOIN conductores C on C.Id=V.conductor WHERE V.Id=$id";
$resultado = mysqli_query($connection, $consulta);
while ($row = $resultado->fetch_assoc()) {
    $NumConduce = $row["NumConduce"];
    $Fecha = $row["Fecha"];
    $Hora = $row["Hora"];
    $Conductor = $row["Conductor"];
}

$pdf = new FPDF('L', 'mm', array(241.3, 127));
$pdf->AliasNbPages();
$pdf->SetMargins(5, 5, 5);
$pdf->AddPage();
$pdf->SetAutoPageBreak(false);
$pdf->Image('../images/LogoNew.png', 5, 5, 25);
$pdf->SetFont('Helvetica', 'B', 17);
$pdf->SetY(0);
$pdf->SetX(100);
$pdf->Cell(40, 25, utf8_decode('Conduce'), 0, 0, 'C');
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetY($y + 10);
$pdf->SetX($x + 40);
$pdf->SetFont('Helvetica', 'B', 12);
$pdf->Cell(0, 0, utf8_decode('No. ' . $NumConduce), 0, 0, 'C');
$pdf->SetY(20);
$pdf->SetX(170);
$pdf->Cell(50, 0, utf8_decode($Fecha), 0, 0, 'R');

//Información Local
$pdf->SetY(25);
$pdf->SetX(5);
$y = $pdf->GetY();
$x = $pdf->GetX();
$pdf->SetFont('Helvetica', 'I', 8);
$pdf->Cell(0, 0, utf8_decode('RNC: 131-91800-1'), 0, 0, 'L');
$pdf->SetX($x);
$y = $pdf->GetY();
$pdf->SetY($y + 5);
$pdf->Cell(0, 0, utf8_decode('Contacto: 809-982-6614'), 0, 0, 'L');
$pdf->SetX($x);
$y = $pdf->GetY();
$pdf->SetY($y + 5);
$pdf->Cell(0, 0, utf8_decode('Dirección: Av. Cordillera #22, La Ciénega, Sto. Dgo. Oeste'), 0, 0, 'L');
$pdf->SetX($x);
$y = $pdf->GetY();
$pdf->SetY($y + 5);


//Información De la Obra

$consulta = "SELECT UPPER(O.Obra)as Obra,UPPER(O.Direccion) as Direccion FROM solicitudes S JOIN obras O on O.Id=S.Obra JOIN viajes V on V.Solicitud=S.Id WHERE V.Id=$id";
$resultado = mysqli_query($connection, $consulta);
while ($row = $resultado->fetch_assoc()) {
    $Obra = $row["Obra"];
    $Direccion = $row["Direccion"];
}

$pdf->SetY(45);
$pdf->SetX(5);
$pdf->SetFont('Helvetica', 'B', 10);
$pdf->Cell(0, 0, utf8_decode('OBRA: ' . $Obra), 0, 0, 'L');
$pdf->SetX(5);
$pdf->SetY(50);
$pdf->Cell(0, 0, utf8_decode('DIRECCIÓN: ' . $Direccion), 0, 0, 'L');
$pdf->SetY(60);


// Better table
// Column widths
$pdf->SetFont('Helvetica', 'B', 10);
$w = array(40, 55, 80, 30);
// Header

$pdf->Ln();

// Data

$consulta = "SELECT Concreto,Concat(Grava,'-',Corte)as Grava,Agregados,Revenimiento FROM vw_conduce_det2 WHERE IdViaje=$id";
$resultado = mysqli_query($connection, $consulta);
while ($row = $resultado->fetch_assoc()) {
    $Concreto = $row["Concreto"];
    $Grava = $row["Grava"];
    $Agregados = $row["Agregados"];
    $Revenimiento = $row["Revenimiento"];
}

$pdf->Cell($w[0], 6, 'Concreto', 1, 0, 'C');
$pdf->Cell($w[1], 6, 'Grava', 1, 0, 'C');
$pdf->Cell($w[2], 6, 'Agregados', 1, 0, 'C');
$pdf->Cell($w[3], 6, 'Revenimiento', 1, 0, 'C');
$pdf->Ln();
$pdf->SetFont('Helvetica', '', 10);



$pdf->Cell($w[0], 6, utf8_decode($Concreto), 1, 0, 'C');
$pdf->Cell($w[1], 6,  utf8_decode($Grava), 1, 0, 'C');
$pdf->Cell($w[2], 6,  utf8_decode($Agregados), 1, 0, 'C');
$pdf->Cell($w[3], 6, $Revenimiento, 1, 0, 'C');

//Información del Conductor y otros detalles

$pdf->SetFont('Helvetica', 'B', 10);
$pdf->SetX(5);
$pdf->SetY(80);
$pdf->Cell(0, 0, utf8_decode('Conductor: ' . $Conductor), 0, 0, 'L');
$pdf->SetX(5);
$pdf->SetY(85);
$pdf->Cell(0, 0, utf8_decode('Salida: ' . $Hora), 0, 0, 'L');
$pdf->SetX(55);
$pdf->Cell(25, 0, 'Llegada: _________', 0, 0, 'L');
$pdf->SetX(100);
$pdf->Cell(25, 0, 'Inicio Vaciado: _________', 0, 0, 'L');
$pdf->SetX(160);
$pdf->Cell(25, 0, 'Fin Vaciado: _________', 0, 0, 'L');
$pdf->SetY(90);
$pdf->Cell(205, 5, 'Recomendaciones: ', 'L,T,R', 0, 'L');
$pdf->SetY(95);
$pdf->Cell(205, 10, '', 'L,R,B', 0, 'L');

$pdf->SetY(115);
$pdf->Cell(25, 0, 'Recibido Por: _____________________________', 0, 0, 'L');
$pdf->SetX(100);
$pdf->Cell(25, 0, 'Firma Cliente: _____________________________', 0, 0, 'L');
ob_end_clean();

$pdf->Output();
