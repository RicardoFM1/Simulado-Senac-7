<?php

use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;

require_once __DIR__ . "/../../Services/Chamado/chamadoService.php";
require_once __DIR__ . "/../../Middleware/middleware.php";

class ChamadoController
{
    protected $chamadoService;

    public function __construct()
    {
        $this->chamadoService = new ChamadoService();
    }

    public function validarDados($dados)
    {
        try {
            $prioridadePermitida = ['baixa', 'média', 'alta'];
            $statusPermitido = ['aberto', 'em andamento', 'resolvido'];


            $esquema = v::key('titulo', v::stringVal()->notEmpty()->length(1, 45))
                ->key('descricao', v::stringVal()->notEmpty()->length(1, 45))
                ->key('setor', v::stringVal()->notEmpty()->length(1, 45))
                ->key('prioridade', v::in($prioridadePermitida))
                ->key('status', v::in($statusPermitido));




            $esquema->assert($dados);
        } catch (NestedValidationException $e) {
            $mensagemPersonalizada = [
                'titulo' => 'Titulo inválido, min 1, max 45',
                'descricao' => 'Descricão inválida',
                'setor' => 'Setor inválido, min 1, max 45',
                'prioridade' => 'Prioridade fora do escopo: baixa, média ou alta',
                'status' => 'Status fora do escopo: aberto, em andamento ou resolvido'

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


    public function listarChamados()
    {
        $this->apenasAdmin();
        http_response_code(200);
        echo json_encode($this->chamadoService->listarChamados());
        exit;
    }

    public function listarChamadosPorStatus()
    {
        $this->apenasAdmin();
        http_response_code(200);
        $statusChamado = $_GET['status'];
        echo json_encode($this->chamadoService->listarChamadosPorStatus($statusChamado));
        exit;
    }

    public function listarChamadosUsuarioId()
    {
        Middleware::validarMiddleware();
        http_response_code(200);
        $idUsuario = $_GET['id_usuario'];
        echo json_encode($this->chamadoService->listarChamadosPorUsuarioId($idUsuario));
        exit;
    }

    public function listarChamadosUsuarioIdEPorStatus()
    {
        Middleware::validarMiddleware();

        http_response_code(200);
        $statusChamado = $_GET['status'];
        $idUsuario = $_GET['id_usuario'];
        echo json_encode($this->chamadoService->listarChamadosPorUsuarioIdEStatus($idUsuario, $statusChamado));
        exit;
    }



    public function criarChamado()
    {
        try {
            Middleware::validarMiddleware();

            $jwt = Middleware::validarMiddleware();
            http_response_code(201);
            $dados = json_decode(file_get_contents('php://input'), true);

            echo json_encode($this->chamadoService->criarChamado($dados, $jwt));
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

    public function atualizarChamado()
    {
        try {
            Middleware::validarMiddleware();

            $jwt = Middleware::validarMiddleware();
            http_response_code(200);
            $dados = json_decode(file_get_contents('php://input'), true);
            $idUsuario = $_GET['id_usuario'];

            echo json_encode($this->chamadoService->atualizarChamado($dados, $idUsuario, $jwt));
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
