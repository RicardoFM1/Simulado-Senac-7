import { Button, Stack } from "react-bootstrap"
import Header from "../../Components/Header/header"
import { FaRegEdit } from "react-icons/fa";
import Tabela from "../../Components/Tabela/tabela";
import Api from "../../Services/api";
import { useEffect, useState } from "react";
import ChamadosModal from "../../Components/Modais/Chamados/chamadosModal";
import { toast } from "react-toastify";


const Chamados = () => {
    const [chamados, setChamados] = useState([])
    const [show, setShow] = useState(false)
    const [chamadoSelecionado, setChamadoSelecionado] = useState([])

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

    useEffect(() => {
        buscarChamados()
    }, [])

    const handleClose = () => {
        setShow(false)
        buscarChamados()
        setChamadoSelecionado(null)

    }

    const handleSubmit = async (dados) => {


        try {
            if (chamadoSelecionado) {
                const res = await Api.put(`/chamado?id_chamado=${chamadoSelecionado.id_chamado}`, dados)

                if (res.status === 200) {
                    toast.success('Chamado atualizado com sucesso!');
                    handleClose()
                }
            }else{

                const res = await Api.post('/chamado', dados)
                
                if (res.status === 201) {
                    toast.success('Chamado criado com sucesso!');
                    handleClose()
                }
            }
        } catch (err) {
            const erros = err.response?.data?.erros
            console.log(err.response?.data)

            if (erros) {
                Object.values(erros).forEach((msg) => {
                    toast.error(msg)
                })
            }
            else {
                toast.error(err.response?.data?.mensagem || 'Erro ao enviar dados')
            }
        }
    }

    const handleEdit = (row) => {
        setShow(true)
        setChamadoSelecionado(row)
    }

    const handleNovo = () => {
        setShow(true)
        setChamadoSelecionado(null)
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
                    <Button variant="warning" onClick={() => handleEdit(row)}><FaRegEdit />
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
            <ChamadosModal dados={chamadoSelecionado} show={show} handleClose={() => setShow(!show)} submit={handleSubmit} />
        </main>
    )
}

export default Chamados