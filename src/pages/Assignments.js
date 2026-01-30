import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import API from "../api";

const Assignments = () => {
    const [assetId, setAssetId] = useState("");
    const [soldier, setSoldier] = useState("");
    const [msg, setMsg] = useState("");

    const handleAssign = async () => {
        try {
            await API.put(`/assets/${assetId}/assign`, { soldierName: soldier });
            setMsg(`Asset ${assetId} Assigned to ${soldier}`);
        } catch (e) { setMsg("Error assigning asset."); }
    };

    const handleExpend = async () => {
        try {
            await API.put(`/assets/${assetId}/expend`);
            setMsg(`Asset ${assetId} marked EXPENDED.`);
        } catch (e) { setMsg("Error expending asset."); }
    };

    return (
        <Container className="mt-4">
            <h2>Assignments & Expenditures</h2>
            {msg && <Card className="p-2 mb-3 bg-info text-white">{msg}</Card>}
            
            <Row>
                <Col md={6}>
                    <Card className="p-3">
                        <h4>Assign to Personnel</h4>
                        <Form.Control placeholder="Asset ID" className="mb-2" onChange={e => setAssetId(e.target.value)} />
                        <Form.Control placeholder="Soldier Name" className="mb-2" onChange={e => setSoldier(e.target.value)} />
                        <Button onClick={handleAssign}>Assign</Button>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-3 bg-light">
                        <h4>Mark as Expended</h4>
                        <p>Use this for ammunition or damaged equipment.</p>
                        <Form.Control placeholder="Asset ID" className="mb-2" onChange={e => setAssetId(e.target.value)} />
                        <Button variant="danger" onClick={handleExpend}>Expend Asset</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Assignments;