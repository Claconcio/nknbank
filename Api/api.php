<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $date = $data['date'];
    $email = $data['email'];
    $pass = $data['pass'];
    $whatsapp = $data['whatsapp'];
}

$conn = mysqli_connect("localhost", "root", "", "nknbank");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$stmt = $conn->prepare("INSERT INTO lead (name, date, email, pass, whatsapp) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $date, $email, $pass, $whatsapp);

if (!$stmt->execute()) {
    die("Error: " . $stmt->error);
}

$stmt->close();
$conn->close();

?>