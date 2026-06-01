import { useEffect, useState } from "react";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Api from "../../Services/api";

const Header = () => {
    const navigate = useNavigate()
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

    const handleSair = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        
            <Navbar className="bg-primary-subtle d-flex justify-content-between">
                <Navbar.Brand className="px-3 fs-3">Sistema de chamados</Navbar.Brand>
                <Stack gap={4} className="mx-4" direction="horizontal">
                    {isAdmin && (
                        <Button onClick={() => navigate('/dashboard') }>Dashboard</Button>
                    ) }
                    <Button onClick={() => navigate('/chamados')}>Chamados</Button>
                     <Button variant="danger" onClick={() => handleSair()}>Sair</Button>
                </Stack>
            </Navbar>
       
    )
}

export default Header;