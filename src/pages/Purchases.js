import { useState, useEffect } from "react";
import { Container, Form, Button, Table, Alert, Badge, Row, Col, Card } from "react-bootstrap";
import API from "../api";

const Purchases = () => {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [formData, setFormData] = useState({ name: "", serialNumber: "", type: "WEAPON", baseId: 1 });
    const [msg, setMsg] = useState({ text: "", type: "" });
    const [filterType, setFilterType] = useState("All");

    useEffect(() => { fetchAssets(); }, []);
    useEffect(() => {
        setFilteredAssets(filterType === "All" ? assets : assets.filter(a => a.type === filterType));
    }, [filterType, assets]);

    const fetchAssets = async () => {
        try {
            const res = await API.get("/assets");
            setAssets(res.data);
            setFilteredAssets(res.data);
        } catch (err) { console.error(err); }
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.serialNumber) {
            setMsg({ text: "Name and Serial Number are required.", type: "danger" });
            return;
        }
        try {
            const payload = {
                name: formData.name,
                serialNumber: formData.serialNumber.trim(),
                type: formData.type,
                currentBase: { id: parseInt(formData.baseId) }
            };
            await API.post("/assets", payload);
            setMsg({ text: "Asset Purchased Successfully!", type: "success" });
            fetchAssets();
            setFormData({ name: "", serialNumber: "", type: "WEAPON", baseId: 1 });
        } catch (err) { 
            const errorMsg = err.response?.data?.message || "Error: Serial Number likely already exists.";
            setMsg({ text: errorMsg, type: "danger" }); 
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Purchases & Inventory</h2>
            
            {msg.text && <Alert variant={msg.type} dismissible onClose={() => setMsg({ text: "", type: "" })}>{msg.text}</Alert>}
            
            <Card className="mb-4 shadow-sm border-0 bg-light"><Card.Body>
                <Form onSubmit={handlePurchase}>
                    <Row className="g-2">
                        <Col md={3}><Form.Control placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></Col>
                        <Col md={3}><Form.Control placeholder="Serial # (Must be Unique)" value={formData.serialNumber} onChange={e => setFormData({...formData, serialNumber: e.target.value})} required /></Col>
                        <Col md={2}>
                            <Form.Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                <option value="WEAPON">Weapon</option>
                                <option value="VEHICLE">Vehicle</option>
                                <option value="AMMUNITION">Ammunition</option>
                            </Form.Select>
                        </Col>
                        <Col md={2}><Form.Control type="number" placeholder="Base ID" value={formData.baseId} onChange={e => setFormData({...formData, baseId: e.target.value})} required /></Col>
                        <Col md={2}><Button type="submit" variant="success" className="w-100">Purchase</Button></Col>
                    </Row>
                </Form>
            </Card.Body></Card>

            <div className="d-flex justify-content-end mb-2">
                <Form.Select style={{width:'200px'}} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="WEAPON">Weapons</option>
                    <option value="VEHICLE">Vehicles</option>
                    <option value="AMMUNITION">Ammunition</option>
                </Form.Select>
            </div>

            <Table striped hover responsive className="align-middle">
                <thead className="table-dark"><tr><th>ID</th><th>Name</th><th>Serial</th><th>Type</th><th>Base</th><th>Status</th></tr></thead>
                <tbody>{filteredAssets.map(a => (
                    <tr key={a.id}><td>{a.id}</td><td className="fw-bold">{a.name}</td><td>{a.serialNumber}</td><td><Badge bg="secondary">{a.type}</Badge></td><td>{a.currentBase?.name}</td><td><Badge bg={a.status==='ACTIVE'?'success':'danger'}>{a.status}</Badge></td></tr>
                ))}</tbody>
            </Table>
        </Container>
    );
};
export default Purchases;