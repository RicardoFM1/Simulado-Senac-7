<?php

use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;

require_once __DIR__ . "/../../Services/Usuario/usuarioService.php";
require_once __DIR__ . "/../../Middleware/middleware.php";

class UsuarioController
{
    protected $usuarioService;

    public function __construct()
    {
        $this->usuarioService = new UsuarioService();
    }

    public function validarDados($dados)
    {
        try {
            $tiposPermitidos = ['administrador', 'comum'];

            $esquema = v::key('nome', v::stringVal()->notEmpty()->length(1, 45))
                ->key('email', v::email())
                ->key('senha', v::stringVal()->notEmpty()->length(8, 255))
                ->key('tipo', v::in($tiposPermitidos));

            $esquema->assert($dados);
        } catch (NestedValidationException $e) {
            $mensagemPersonalizada = [
                'nome' => 'Nome inválido, min 1, max 45',
                'email' => 'Email inválido',
                'senha' => 'Senha inválida, min 8, max 255',
                'tipo' => 'Tipo fora do escopo: administrador ou comum'
            ];

            $mensagemOriginal = $e->getMessages();
            $mensagemTraduzida = [];

            foreach ($mensagemOriginal as $campo => $mensagem) {
                $mensagemTraduzida[$campo] = $mensagemPersonalizada[$campo] ?? $mensagem;
            }

            return [
                'sucesso' => false,
                'mensagem' => 'Erro de validação',
                'erros' => $mensagemTraduzida
            ];
        }
    }

    public function apenasAdmin()
    {
        $jwt = Middleware::validarMiddleware();

        if ($jwt->dados->tipo_usuario !== 'administrador') {
            http_response_code(403);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => "Usuário sem permissão"
            ]);
            exit;
        }
    }


    public function listarUsuarios()
    {
        $this->apenasAdmin();
        http_response_code(200);
        echo json_encode($this->usuarioService->listarUsuarios());
        exit;
    }

    public function criarUsuario()
    {
        try {
            http_response_code(201);
            $dados = json_decode(file_get_contents('php://input'), true);

            echo json_encode($this->usuarioService->fazerLogin($dados));
            exit;
        } catch (Exception $e) {
            http_response_code($e->getCode());
            echo json_encode([
                'sucesso' => false,
                'mensagem' => $e->getMessage()
            ]);
            exit;
        }
    }

    public function fazerLogin()
    {
        try {
            http_response_code(200);
            $dados = json_decode(file_get_contents('php://input'), true);

            echo json_encode($this->usuarioService->criarUsuario($dados));
            exit;
        } catch (Exception $e) {
            http_response_code($e->getCode());
            echo json_encode([
                'sucesso' => false,
                'mensagem' => $e->getMessage()
            ]);
            exit;
        }
    }
}
