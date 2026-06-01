import { Button, Card, Container, Form, InputGroup, Stack } from "react-bootstrap"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



import style from "./login.module.css"
import { useEffect, useState } from "react"
import Api from "../../Services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {


    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    })


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            navigate('/')
        }
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target

        if (!name) return;

        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await Api.post('/usuario/login', formData)

            if(res.status === 200){
                toast.success('Usuário logado com sucesso!');
                localStorage.setItem('token', res.data?.token)
                navigate('/')
            }
        } catch (err) {
            const erros = err.response?.data?.erros
            console.log(err.response?.data)

            if(erros){
                Object.values(erros).forEach((msg) => {
                    toast.error(msg)
                })
            }
            else{
                toast.error(err.response?.data?.mensagem || 'Erro ao enviar dados')
            }
        }
    }
    return (
        <Container fluid className={style.container}>
            <Card className="p-5">
                <Form onSubmit={handleSubmit}>

                    <Card.Title className="text-center fs-3 fw-bold">Sistema de chamados</Card.Title>
                    <Card.Subtitle className="mt-3 text-center">Faça seu login:</Card.Subtitle>
                    <hr />
                    <Card.Body>
                        <Stack gap={3}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><MdEmail size={25}/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        name="email"
                                        placeholder="Seu melhor email"
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Senha:</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><RiLockPasswordFill size={25}/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={formData.senha}
                                        onChange={handleChange}
                                        name="senha"
                                        placeholder="Sua senha"
                                        required
                                        type={mostrarSenha ? 'text' : 'password'}
                                    />
                                    <Button onClick={() => setMostrarSenha(!mostrarSenha)}>{mostrarSenha ? <FaEye /> : <FaEyeSlash />}</Button>
                                </InputGroup>
                            </Form.Group>
                        </Stack>
                    </Card.Body>
                    <Stack className="mt-3">

                        <Button type="submit">Login</Button>
                    </Stack>

                </Form>
            </Card>
        </Container>
    )
}

export default Login