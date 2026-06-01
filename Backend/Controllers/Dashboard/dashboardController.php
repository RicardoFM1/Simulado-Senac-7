<?php

class DashboardController {
    public function listarDashboard() {
        $chamadoService = new ChamadoService();
        $chamados = $chamadoService->listarChamados();

        $chamadosAbertos = null;
        $chamadosEmAndamento = null;
        $chamadosResolvidos = null;

        foreach($chamados['dados'] as $chamado){
            if($chamado['status'] === 'aberto'){
                $chamadosAbertos++;
            }

             if($chamado['status'] === 'em andamento'){
                $chamadosEmAndamento++;
            }

             if($chamado['status'] === 'resolvido'){
                $chamadosResolvidos++;
            }
        }

        http_response_code(200);
        echo json_encode([
            'sucesso' => true,
            'dados' => [
                'chamados_abertos' => $chamadosAbertos,
                'chamados_em_andamento' => $chamadosEmAndamento,
                'chamados_resolvidos' => $chamadosResolvidos
            ]
        ]);
        exit;
    }
}