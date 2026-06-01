<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization, Content-Type');



require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../Controllers/Usuario/usuarioController.php";
require_once __DIR__ . "/../Controllers/Chamado/chamadoController.php";
require_once __DIR__ . "/../Controllers/Dashboard/dashboardController.php";
require_once __DIR__ . "/../Middleware/middleware.php";

use Dotenv\Dotenv;


$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$rota = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'OPTIONS') {
    http_response_code(200);
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

if ($rota === '/chamado') {
    $controller = new ChamadoController();

    if ($metodo === 'GET') {
        $controller->listarChamados();
    }

    if ($metodo === 'GET' && $_GET['status']) {
        $controller->listarChamadosPorStatus();
    }

    if ($metodo === 'GET' && $_GET['status'] && $_GET['id_usuario']) {
        $controller->listarChamadosUsuarioIdEPorStatus();
    }

    if ($metodo === 'GET' && $_GET['id_usuario']) {
        $controller->listarChamadosUsuarioId();
    }

    if ($metodo === 'POST') {
        $controller->criarChamado();
    }

    if ($metodo === 'PUT' && $_GET['id_usuario']) {
        $controller->atualizarChamado();
    }
}

if ($rota === '/retrieve') {
    if ($metodo === 'GET') {
        
        http_response_code(200);
        echo json_encode(Middleware::validarMiddleware());
        exit;
    }
}

if ($rota === '/dashboard') {
    $controller = new DashboardController();
    if ($metodo === 'GET') {

        $controller->listarDashboard();
    }
}


http_response_code(404);
echo json_encode([
    'sucesso' => false,
    'mensagem' => 'Rota não encontrada'
]);
exit;
