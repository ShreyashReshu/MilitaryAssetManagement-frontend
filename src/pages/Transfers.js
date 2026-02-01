import { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Card, Table, Badge, Alert, Row, Col } from "react-bootstrap";
import API from "../api";
import AuthContext from "../context/AuthContext";

const Transfers = () => {
    const { role } = useContext(AuthContext);
    const [transfer, setTransfer] = useState({ assetId: "", sourceBaseId: "", destBaseId: "" });
    const [bases, setBases] = useState([]);
    const [message, setMessage] = useState(null);
    const [history, setHistory] = useState([]);
    const canTransfer = role === "ADMIN" || role === "LOGISTICS" || role === "COMMANDER";

    useEffect(() => { 
        fetchBases();
        fetchHistory(); 
    }, []);

    const fetchBases = async () => {
        try {
            const res = await API.get("/assets/bases");
            setBases(res.data);
        } catch (err) { console.error("Failed to load bases"); }
    };

    const fetchHistory = async () => {
        try {
            const res = await API.get("/assets/transfers/history");
            setHistory(res.data);
        } catch (err) { console.error("Failed to load history"); }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            await API.post("/assets/transfer", transfer);
            setMessage({ type: "success", text: "Transfer Successful! Log updated." });
            fetchHistory(); 
            setTransfer({ assetId: "", sourceBaseId: "", destBaseId: "" });
        } catch (err) {
            setMessage({ type: "danger", text: "Transfer Failed. Check Asset ID and Base Selection." });
        }
    };

    if (!canTransfer) {
        return <Container className="mt-4"><Alert variant="danger">Access Denied: Only Admin, Logistics, and Commanders can perform transfers.</Alert></Container>;
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Logistics & Transfers</h2>
            {message && <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>{message.text}</Alert>}

            <Card className="p-4 mb-5 shadow border-0 border-start border-warning border-5">
                <Card.Title className="mb-3">Initiate Transfer</Card.Title>
                <Form onSubmit={handleTransfer}>
                    <Row className="g-3">
                        <Col md={3}>
                            <Form.Control 
                                type="number" 
                                placeholder="Asset ID" 
                                value={transfer.assetId} 
                                onChange={e => setTransfer({...transfer, assetId: e.target.value})} 
                                required 
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Select 
                                value={transfer.sourceBaseId} 
                                onChange={e => setTransfer({...transfer, sourceBaseId: e.target.value})} 
                                required
                            >
                                <option value="">Select Source Base</option>
                                {bases.map(base => (
                                    <option key={base.id} value={base.id}>{base.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={3}>
                            <Form.Select 
                                value={transfer.destBaseId} 
                                onChange={e => setTransfer({...transfer, destBaseId: e.target.value})} 
                                required
                            >
                                <option value="">Select Destination Base</option>
                                {bases.map(base => (
                                    <option key={base.id} value={base.id}>{base.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={3}><Button variant="warning" type="submit" className="w-100 fw-bold">Execute Move</Button></Col>
                    </Row>
                </Form>
            </Card>

            <h4 className="text-muted">Movement Audit Log</h4>
            <Table hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr><th>ID</th><th>Asset</th><th>From</th><th>To</th><th>Time (UTC)</th><th>Status</th></tr>
                </thead>
                <tbody>
                    {history.length === 0 ? <tr><td colSpan="6" className="text-center">No transfers recorded.</td></tr> : history.map(log => (
                        <tr key={log.id}>
                            <td>#{log.id}</td><td className="fw-bold">{log.assetName}</td>
                            <td><Badge bg="secondary">{log.sourceBase}</Badge></td>
                            <td><Badge bg="info">{log.destBase}</Badge></td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td><Badge bg="success">COMPLETED</Badge></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
export default Transfers;