<?php
date_default_timezone_set('America/Sao_Paulo');

use Firebase\JWT\JWT;

require_once __DIR__ . "/../../Connection/db.php";

class ChamadoService
{
    protected $db;

    public function __construct()
    {
        $this->db = db();
    }

    public function buscarChamadoPorId($idChamado)
    {
        if (empty($idChamado)) {
            throw new Exception('Dados inválidos', 400);
        }

        $buscar = $this->db->prepare('SELECT * FROM chamados WHERE id_chamado = :id_chamado');

        $buscar->execute([
            ':id_chamado' => $idChamado
        ]);

        $chamado = $buscar->fetch();

        if (empty($chamado)) {
            return [
                'sucesso' => false,
                'mensagem' => 'Chamado não encontrado',
                'codigo' => '404'
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $chamado
        ];
    }
    // Admin
    public function listarChamadosPorStatus($statusChamado)
    {
        if (empty($statusChamado)) {
            throw new Exception('Dados inválidos', 400);
        }
        $query = $this->db->query("SELECT * FROM chamados WHERE status = :status");

        $query->execute([
            ':status' => $statusChamado
        ]);

        $chamados = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $chamados,
            'total' => count($chamados)
        ];
    }

    // Admin
    public function listarChamados()
    {
        $query = $this->db->query("SELECT * FROM chamados");

        $query->execute();

        $chamados = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $chamados,
            'total' => count($chamados)
        ];
    }

    // Usuário Comum
    public function listarChamadosPorUsuarioId($usuarioId)
    {

        if (empty($usuarioId)) {
            throw new Exception('Dados inválidos', 400);
        }

        $query = $this->db->query("SELECT * FROM chamados WHERE usuario_idusuario = :usuario_idusuario");

        $query->execute([
            ':usuario_idusuario' => $usuarioId
        ]);

        $chamados = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $chamados,
            'total' => count($chamados)
        ];
    }

    // Usuário Comum
    public function listarChamadosPorUsuarioIdEStatus($usuarioId, $statusChamado)
    {

        if (empty($usuarioId)) {
            throw new Exception('Dados inválidos', 400);
        }

        if (empty($statusChamado)) {
            throw new Exception('Dados inválidos', 400);
        }

        $query = $this->db->query("SELECT * FROM chamados WHERE usuario_idusuario = :usuario_idusuario AND 
        status = :status");

        $query->execute([
            ':usuario_idusuario' => $usuarioId,
            ':status' => $statusChamado
        ]);

        $chamados = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $chamados,
            'total' => count($chamados)
        ];
    }




    public function criarChamado($chamadoDados, $jwt)
    {
        try {
            $dataFormatada = date('Y-m-d');

            $criar = $this->db->prepare('INSERT INTO chamados (titulo, descricao, setor, prioridade, status, usuario_idusuario, data)
            VALUES(:titulo, :descricao, :setor, :prioridade, :status, :usuario_idusuario, :data)');

            $criar->execute([
                ':titulo' => $chamadoDados['titulo'],
                ':descricao' => $chamadoDados['descricao'],
                ':setor' => $chamadoDados['setor'],
                ':prioridade' => $chamadoDados['prioridade'],
                ':status' => $chamadoDados['status'],
                ':usuario_idusuario' => $jwt->dados->id_usuario,
                ':data' => $dataFormatada

            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Chamado criado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'fk_chamados_usuarios')) {
                throw new Exception('Usuario referenciado não encontrado', 404);
            }
            throw new Exception('Erro ao criar chamado', 500);
        }
    }

    public function atualizarChamado($chamadoDados, $idChamado, $jwt)
    {

        try {
            $dataFormatada = date('Y-m-d');
            if (empty($idChamado)) {
                throw new Exception('Dados inválidos', 400);
            }
            $chamado = $this->buscarChamadoPorId($idChamado);

            if ($chamado['sucesso'] === false) {
                throw new Exception($chamado['mensagem'], $chamado['codigo']);
            }

            $atualizar = $this->db->prepare('UPDATE chamados SET titulo = :titulo, descricao = :descricao,
    setor = :setor, prioridade = :prioridade, status = :status, usuario_idusuario = :usuario_idusuario,
    data = :data WHERE id_chamado = :id_chamado');

            $atualizar->execute([
                ':titulo' => $chamadoDados['titulo'],
                ':descricao' => $chamadoDados['descricao'],
                ':setor' => $chamadoDados['setor'],
                ':prioridade' => $chamadoDados['prioridade'],
                ':status' => $chamadoDados['status'],
                ':usuario_idusuario' => $jwt->dados->id_usuario,
                ':data' => $dataFormatada,
                'id_chamado' => $idChamado
            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Chamado atualizado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'fk_chamados_usuarios')) {
                throw new Exception('Usuário referenciado não encontrado', 404);
            }
            throw new Exception('Erro ao criar chamado', 500);
        }
    }
}
