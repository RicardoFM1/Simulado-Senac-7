import { useEffect } from "react";
import Header from "../../Components/Header/header";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem('token')

    if(!token){
        navigate('/login')
    }
    }, [])
    return (
        <>
        <Header/>
        </>
    )
}

export default Home;