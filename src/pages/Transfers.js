import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import API from "../api";

const Transfers = () => {
    const [transfer, setTransfer] = useState({ assetId: "", sourceBaseId: "", destBaseId: "" });
    const [message, setMessage] = useState(null);

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            await API.post("/assets/transfer", transfer);
            setMessage({ type: "success", text: "Transfer Successful!" });
        } catch (err) {
            setMessage({ type: "danger", text: "Transfer Failed. Check IDs." });
        }
    };

    return (
        <Container className="mt-4">
            <h2>Asset Transfers</h2>
            {message && <Card className={`p-3 mb-3 bg-${message.type} text-white`}>{message.text}</Card>}

            <Card className="p-4">
                <Form onSubmit={handleTransfer}>
                    <Form.Group className="mb-3">
                        <Form.Label>Asset ID to Move</Form.Label>
                        <Form.Control type="number" onChange={e => setTransfer({...transfer, assetId: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Source Base ID</Form.Label>
                        <Form.Control type="number" onChange={e => setTransfer({...transfer, sourceBaseId: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Destination Base ID</Form.Label>
                        <Form.Control type="number" onChange={e => setTransfer({...transfer, destBaseId: e.target.value})} required />
                    </Form.Group>
                    <Button variant="warning" type="submit">Initiate Transfer</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Transfers;