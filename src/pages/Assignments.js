import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, Table, Badge } from "react-bootstrap";
import API from "../api";

const Assignments = () => {
    const [assignData, setAssignData] = useState({ id: "", soldier: "" });
    const [expendId, setExpendId] = useState("");
    const [msg, setMsg] = useState({ text: "", type: "" });
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await API.get("/assets/audit-logs");
            setLogs(res.data);
        } catch (e) { console.error("Error fetching logs"); }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/assets/${assignData.id}/assign`, { soldierName: assignData.soldier });
            setMsg({ text: `Success: Asset #${assignData.id} assigned to ${assignData.soldier}`, type: "success" });
            setAssignData({ id: "", soldier: "" }); // Clear Input
            fetchLogs(); // Refresh Log
        } catch (e) { 
            setMsg({ text: "Error: Check Asset ID.", type: "danger" }); 
        }
    };

    const handleExpend = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/assets/${expendId}/expend`);
            setMsg({ text: `Success: Asset #${expendId} marked EXPENDED`, type: "warning" });
            setExpendId(""); // Clear Input
            fetchLogs(); // Refresh Log
        } catch (e) { 
            setMsg({ text: "Error: Check Asset ID.", type: "danger" }); 
        }
    };

    return (
        <Container className="mt-4 pb-5">
            <h2 className="mb-4">Assignments & Expenditures</h2>
            {msg.text && <Alert variant={msg.type} dismissible onClose={() => setMsg({ text: "", type: "" })}>{msg.text}</Alert>}
            
            <Row className="mb-5 g-4">
                <Col md={6}>
                    <Card className="shadow-sm border-0 border-top border-primary border-4 h-100">
                        <Card.Body>
                            <h4 className="text-primary mb-3">Assign to Personnel</h4>
                            <Form onSubmit={handleAssign}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Asset ID</Form.Label>
                                    <Form.Control type="number" placeholder="Enter ID..." value={assignData.id} onChange={e => setAssignData({...assignData, id: e.target.value})} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Soldier Name</Form.Label>
                                    <Form.Control type="text" placeholder="e.g. Sgt. Miller" value={assignData.soldier} onChange={e => setAssignData({...assignData, soldier: e.target.value})} required />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100 fw-bold">Confirm Assignment</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="shadow-sm border-0 border-top border-danger border-4 h-100 bg-light">
                        <Card.Body>
                            <h4 className="text-danger mb-3">Report Expenditure</h4>
                            <p className="text-muted small">Use for consumed ammunition or damaged equipment.</p>
                            <Form onSubmit={handleExpend}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Asset ID</Form.Label>
                                    <Form.Control type="number" placeholder="Enter ID..." value={expendId} onChange={e => setExpendId(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" variant="danger" className="w-100 fw-bold mt-4">Mark as EXPENDED</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h4 className="text-muted">Transaction Audit Log</h4>
            <Card className="shadow-sm border-0">
                <Table hover responsive className="mb-0">
                    <thead className="table-dark">
                        <tr><th>ID</th><th>Action</th><th>Asset</th><th>Details</th><th>Time</th></tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? <tr><td colSpan="5" className="text-center p-3">No logs found.</td></tr> : logs.map(log => (
                            <tr key={log.id}>
                                <td>#{log.id}</td>
                                <td><Badge bg={log.actionType==='PURCHASE'?'success':log.actionType==='ASSIGN'?'primary':'danger'}>{log.actionType}</Badge></td>
                                <td className="fw-bold">{log.assetName}</td>
                                <td>{log.details}</td>
                                <td className="text-muted small">{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};
export default Assignments;