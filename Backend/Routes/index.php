<?php

use Dotenv\Dotenv;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../Controllers/Usuario/usuarioController.php";

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$rota = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'OPTIONS') {
    http_response_code(200);
    echo 'ok';
    exit;
}


if ($rota === '/usuario') {
    $controller = new UsuarioController();

    if ($metodo === 'GET') {
        $controller->listarUsuarios();
    }

    if ($metodo === 'POST') {
        $controller->criarUsuario();
    }
}



if ($rota === '/usuario/login') {
    $controller = new UsuarioController();


    if ($metodo === 'POST') {
        $controller->fazerLogin();
    }
}


http_response_code(404);
echo json_encode([
    'sucesso' => false,
    'mensagem' => 'Rota não encontrada'
]);
exit;
