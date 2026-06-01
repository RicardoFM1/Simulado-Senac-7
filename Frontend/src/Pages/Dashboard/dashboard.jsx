import { useEffect, useState } from "react"
import Api from "../../Services/api"
import Header from "../../Components/Header/header"
import { Button, Card, Stack } from "react-bootstrap"
import Tabela from "../../Components/Tabela/tabela"
import UsuariosModal from "../../Components/Modais/Usuarios/usuariosModal"
import { toast } from "react-toastify"
import style from "./dashboard.module.css"

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [retrieve, setRetrieve] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [dashboard, setDashboard] = useState([])
    const [show, setShow] = useState(false)


    const buscarRetrieve = async () => {
        try {
            const res = await Api.get('/retrieve')

            if (res.status === 200) {
                setRetrieve(res.data?.dados)
                console.log(res.data?.dados)
                if (res.data?.dados.tipo_usuario === 'administrador') {
                    setIsAdmin(true)
                }


            }
        } catch (err) {
            console.log(err)
        }
    }




    const buscarUsuarios = async () => {
        try {
            const res = await Api.get('/usuario')

            if (res.status === 200) {
                setUsuarios(res.data?.dados)
                console.log(res.data?.dados)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = () => {
        setShow(false)
        buscarChamados()


    }

    const handleSubmit = async (dados) => {


        try {

            const res = await Api.post('/usuario', dados)

            if (res.status === 201) {
                toast.success('Usuário criado com sucesso!');
                handleClose()

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
                console.log(err)
            }
        }
    }

    const handleNovo = () => {
        setShow(true)
    }

    const buscarDashboard = async () => {
        try {
            const res = await Api.get('/dashboard')

            if (res.status === 200) {
                setDashboard(res.data.dados)
                console.log(res.data.dados)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        buscarRetrieve()
        buscarUsuarios()
        buscarDashboard()
    }, [])

    const columns = [
        { header: 'Nº', accessor: 'id_usuario' },
        { header: 'Nome', accessor: 'nome' },
        { header: 'Email', accessor: 'email' },
        { header: 'Tipo', accessor: 'tipo' }

    ]
    return (
        <main>
            <Header />
            {isAdmin && (
                <>

                    <h1 className="m-4">Dashboard</h1>
                    <hr />

                    <Button className="m-4" onClick={() => handleNovo()}>Criar novo</Button>
                    <Tabela columns={columns} rows={usuarios} keyField={'id_usuario'} />
                    <UsuariosModal show={show} handleClose={() => setShow(!show)} submit={handleSubmit} />
                </>
            )}

        </main>
    )
}

export default Dashboard;