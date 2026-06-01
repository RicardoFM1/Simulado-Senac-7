import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import Api from "../../../Services/api";


const ChamadosModal = ({ dados, show, handleClose, submit }) => {
    const [retrieve, setRetrieve] = useState([])
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        setor: "",
        prioridade: "",
        status: "",
        usuario_idusuario: ""
    })

    const buscarRetrieve = async () => {
        try {
            const res = await Api.get('/retrieve')

            if (res.status === 200) {
                setRetrieve(res.data?.dados)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [editando, setEditando] = useState(false)

    useEffect(() => {
        buscarRetrieve()
        if (dados) {
            setEditando(true)
            setFormData(dados)
        } else {
            setEditando(false)
            setFormData({
                titulo: "",
                descricao: "",
                setor: "",
                prioridade: "",
                status: "",
                usuario_idusuario: ""
            })
        }
    }, [show, dados])

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

                    <Modal.Title>{editando ? 'Editar chamado' : 'Criar chamado'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                value={formData.titulo}
                                name="titulo"
                                onChange={handleChange}
                                placeholder="Adicione um título"
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                value={formData.descricao}
                                name="descricao"
                                onChange={handleChange}
                                placeholder="Adicione uma descrição"
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Setor</Form.Label>
                            <Form.Control
                                value={formData.setor}
                                name="setor"
                                onChange={handleChange}
                                placeholder="Adicione um setor"
                                required={!editando}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Select
                                value={formData.prioridade}
                                name="prioridade"
                                onChange={handleChange}
                                required={!editando}
                            >
                                <option value=''>Selecione uma opção</option>
                                <option value='baixa'>Baixa</option>
                                <option value='média'>Média</option>
                                <option value='alta'>Alta</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={formData.status}
                                name="status"
                                onChange={handleChange}
                                required={!editando}
                            >
                                <option value=''>Selecione uma opção</option>
                                <option value='aberto'>Aberto</option>
                                <option value='em andamento'>Em andamento</option>
                                <option value='resolvido'>Resolvido</option>

                            </Form.Select>
                        </Form.Group>
                         <Form.Group>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                value={formData.usuario_idusuario}
                                name="usuario_idusuario"
                                onChange={handleChange}
                                required={!editando}
                                type="number"
                            />
                                
                    
                      
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Stack>
                    <Button type="submit">{editando ? 'Salvar alterações' : 'Criar'}</Button>
                    </Stack>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ChamadosModal;