import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import Api from "../../../Services/api";


const UsuariosModal = ({ show, handleClose, submit }) => {

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        tipo: "",

    })




    const handleChange = (e) => {
        const { name, value } = e.target

        if (!name) return

        setFormData((prev) => ({ ...prev, [name]: value }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submit(formData)
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form className="p-3" onSubmit={handleSubmit}>

                <Modal.Header closeButton>

                    <Modal.Title>Criar usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                value={formData.nome}
                                name="nome"
                                onChange={handleChange}
                                placeholder="Adicione um nome"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={formData.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="Adicione um email"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                value={formData.senha}
                                type="password"
                                name="senha"
                                onChange={handleChange}
                                placeholder="Adicione uma senha"
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select
                                value={formData.tipo}
                                name="tipo"
                                onChange={handleChange}
                                required
                            >
                                <option value=''>Selecione uma opção</option>
                                <option value='administrador'>Administrador</option>
                                <option value='comum'>Comum</option>
                            </Form.Select>
                        </Form.Group>

                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Stack>
                        <Button type="submit">Criar</Button>
                    </Stack>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UsuariosModal;