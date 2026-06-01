import { Container, Table } from "react-bootstrap"

const Tabela = ({columns, rows, keyField}) => {
    const temDados = rows && rows.length > 0
    return (
        <Container fluid>
            
        <Table responsive bordered hover>
            <thead>
                <tr>
                  {columns.map((column) => (
                      <td key={column.accessor}>{column.header}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {temDados ? (
                    
                    rows.map((row) => (
                        <tr key={rows[keyField]}>
                        {columns.map((column) => (
                            <td key={column.accessor}>{column.render ? column.render(row) : row[column.accessor]}</td>
                        ))}
                    </tr>
                ))
            ) : (
                <td className="text-center text-mute" colSpan={columns.length}>Sem dados</td>
            )}
            </tbody>
        </Table>
            </Container>
    )
}

export default Tabela