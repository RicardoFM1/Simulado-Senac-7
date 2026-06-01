import { useEffect, useState } from "react"
import Api from "../../Services/api"
import Header from "../../Components/Header/header"

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [retrieve, setRetrieve] = useState([])
     const buscarRetrieve = async() => {
        try{
        const res = await Api.get('/retrieve')

        if(res.status === 200){
            setRetrieve(res.data?.dados)
            console.log(res.data?.dados)
            if(res.data?.dados.tipo_usuario === 'administrador'){
                setIsAdmin(true)
            }
            

        }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        buscarRetrieve()
        
    }, [])
    return (
        <main>
            <Header/>
        {isAdmin && (
            <>

            <h1 className="m-4">Dashboard</h1>
            <hr/>
            </>
        )}
        
        </main>
    )
}

export default Dashboard;