<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connect.php");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        handleGet($pdo, $input);
        break;
    default:
        echo json_encode(['message' => 'Invalid request method']);
        break;
}

function handleGet($pdo, $input)
{
    $sql = "SELECT * FROM products WHERE categoryID = :categoryID";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['categoryID' => $input['categoryID']]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($products as &$product) {
        $weightStmt = $pdo->prepare("SELECT * FROM productweights WHERE productID = :productID");
        $weightStmt->execute(['productID' => $product['productID']]);
        $weights = $weightStmt->fetchAll(PDO::FETCH_ASSOC);

        $product['weights'] = $weights;
        $product['isAvailable'] = $product['isAvailable'] == 'true';
    }

    echo json_encode($products);
}
?>