import { useEffect, useState } from "react";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Api from "../../Services/api";

const Header = () => {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState(false)
    const [retrieve, setRetrieve] = useState([])

    const buscarRetrieve = async() => {
        try{
        const res = await Api.get('/retrieve')

        if(res.status === 200){
            setRetrieve(res.data?.dados)
            console.log(res.data?.dados)
        }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        buscarRetrieve()
    }, [])
    return (
        
            <Navbar className="bg-primary-subtle d-flex justify-content-between">
                <Navbar.Brand className="px-3 fs-3">Sistema de chamados</Navbar.Brand>
                <Stack gap={4} className="mx-4" direction="horizontal">
                    <Button onClick={() => navigate('/dashboard') }>Dashboard</Button>
                    <Button onClick={() => navigate('/chamados')}>Chamados</Button>
                </Stack>
            </Navbar>
       
    )
}

export default Header;