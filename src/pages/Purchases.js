import { useState, useEffect } from "react";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";
import API from "../api";

const Purchases = () => {
    const [assets, setAssets] = useState([]);
    const [formData, setFormData] = useState({ name: "", serialNumber: "", type: "WEAPON", baseId: 1 });
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        const res = await API.get("/assets");
        setAssets(res.data);
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        try {
            await API.post("/assets", formData);
            setMsg("Asset Purchased Successfully!");
            fetchAssets();
        } catch (err) {
            setMsg("Error purchasing asset.");
        }
    };

    return (
        <Container className="mt-4">
            <h2>Purchases & Inventory</h2>
            {msg && <Alert variant="success">{msg}</Alert>}
            
            <Form onSubmit={handlePurchase} className="mb-4 p-3 border rounded bg-white">
                <h4>Record New Purchase</h4>
                <div className="d-flex gap-2">
                    <Form.Control placeholder="Asset Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <Form.Control placeholder="Serial #" onChange={e => setFormData({...formData, serialNumber: e.target.value})} required />
                    <Form.Select onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="WEAPON">Weapon</option>
                        <option value="VEHICLE">Vehicle</option>
                    </Form.Select>
                    <Form.Control type="number" placeholder="Base ID" onChange={e => setFormData({...formData, baseId: e.target.value})} required />
                    <Button type="submit" variant="success">Purchase</Button>
                </div>
            </Form>

            <Table striped bordered hover>
                <thead><tr><th>ID</th><th>Name</th><th>Serial</th><th>Type</th><th>Current Base</th><th>Status</th></tr></thead>
                <tbody>
                    {assets.map(a => (
                        <tr key={a.id}>
                            <td>{a.id}</td><td>{a.name}</td><td>{a.serialNumber}</td><td>{a.type}</td>
                            <td>{a.currentBase?.name || 'N/A'}</td><td>{a.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Purchases;