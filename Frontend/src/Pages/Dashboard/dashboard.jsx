import { useEffect, useState } from "react"
import Api from "../../Services/api"
import Header from "../../Components/Header/header"
import { Button } from "react-bootstrap"
import Tabela from "../../Components/Tabela/tabela"

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [retrieve, setRetrieve] = useState([])
    const [usuarios, setUsuarios] = useState([])

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

    const handleSubmit = () => {

    }

    const handleNovo = () => {

    }


    useEffect(() => {
        buscarRetrieve()
        buscarUsuarios()
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
                    <Tabela columns={columns} rows={usuarios} keyField={'id_usuario'}/>
                </>
            )}

        </main>
    )
}

export default Dashboard;