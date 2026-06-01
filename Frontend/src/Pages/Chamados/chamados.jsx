import { Button, Stack } from "react-bootstrap"
import Header from "../../Components/Header/header"
import { FaRegEdit } from "react-icons/fa";
import Tabela from "../../Components/Tabela/tabela";
import Api from "../../Services/api";
import { useState } from "react";


const Chamados = () => {
    const [chamados, setChamados] = useState([])

    const buscarChamados = async () => {
        try {
            const res = await Api.get('/chamado')

            if (res.status === 200) {
                setChamados(res.data?.dados)
                console.log(res.data?.dados)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = () => {

    }

    const handleEdit = () => {

    }

    const handleNovo = () => {

    }

    const columns = [
        { header: 'Nº', accessor: 'id_chamado' },
        { header: 'Título', accessor: 'titulo' },
        { header: 'Descrição', accessor: 'descricao' },
        { header: 'Setor', accessor: 'setor' },
        { header: 'Prioridade', accessor: 'prioridade' },
        { header: 'Status', accessor: 'status' },
        { header: 'Id do usuário', accessor: 'usuario_idusuario' },
        { header: 'Data', accessor: 'data' },
        {
            header: 'Ações', accessor: 'acoes', render: (row) => (
                <Stack direction="horizontal">
                    <Button variant="warning" onClick={() => handleEdit(row)}><FaRegEdit size={25} />
                    </Button>
                </Stack>
            )
        },



    ]

    return (
        <main>
            <Header />
            <h1 className="m-4">Chamados</h1>
            <hr />
            <Button onClick={() => handleNovo()} className="m-4">Criar novo</Button>
            <Tabela columns={columns} rows={chamados} keyField={'id_chamado'} />
        </main>
    )
}

export default Chamados