<?php

use Firebase\JWT\JWT;

require_once __DIR__ . "/../../Connection/db.php";

class UsuarioService {
    protected $db;

    public function __construct()
    {
        $this->db = db();
    }

    public function buscarUsuarioPorEmail($email){
        if(empty($email)){
            throw new Exception('Dados inválidos', 400);
        }

        $buscar = $this->db->prepare('SELECT * FROM usuarios WHERE email = :email');

        $buscar->execute([
            ':email' => $email
        ]);

        $usuario = $buscar->fetch();

        if(empty($usuario)){
            return [
                'sucesso' => false,
                'mensagem' => 'Usuário não encontrado',
                'codigo' => '404'
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $usuario
        ];
    }

    public function listarUsuarios () {
        $query = $this->db->query("SELECT * FROM usuarios");

        $query->execute();

        $usuarios = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $usuarios,
            'total' => count($usuarios)
        ];
    }

    public function criarUsuario ($usuarioDados) {
        try{
            $criar = $this->db->prepare('INSERT INTO usuarios (nome, email, senha, tipo)
            VALUES(:nome, :email, :senha, :tipo)');

            $criar->execute([
                ':nome' => $usuarioDados['nome'],
                ':email' => $usuarioDados['email'],
                ':senha' => password_hash($usuarioDados['senha'], PASSWORD_DEFAULT),
                ':tipo' => $usuarioDados['tipo']
            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Usuário criado com sucesso'
            ];

        }catch(PDOException $e){
            if(str_contains($e->getMessage(), 'email')){
                throw new Exception('Email já em uso', 409);
            }
            throw new Exception('Erro ao criar usuário', 500);
        }
    }

    public function fazerLogin($usuarioDados){
        try{
            echo 'chegou';
        $usuario = $this->buscarUsuarioPorEmail($usuarioDados['email']);

        if($usuario['sucesso'] === false){
            throw new Exception('Credenciais inválidas', 401);
        }

        $senhaCorreta = password_verify($usuarioDados['senha'], $usuario['dados']['senha']);

        if(!$senhaCorreta){
            throw new Exception('Credenciais inválidas', 401);
        }

        $payload = [
            'exp' => time() + 10000,
            'dados' => [
                'id_usuario' => $usuario['dados']['id_usuario'],
                'email_usuario' => $usuario['dados']['email'],
                'tipo_usuario' => $usuario['dados']['tipo']
            ]
        ];

        $jwt = JWT::encode($payload, $_ENV['CHAVE_SECRETA'], 'HS256');

        return [
            'sucesso' => true,
            'mensagem' => 'Usuário logado com sucesso',
            'token' => $jwt
        ];
        
        }catch(PDOException $e){
            throw new Exception('Erro ao tentar fazer login', 500);
        }
    }
}