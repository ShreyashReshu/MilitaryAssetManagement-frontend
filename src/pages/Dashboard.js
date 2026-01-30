import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import API from "../api";
import NetMovementModal from "../components/NetMovementModal";

const Dashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const res = await API.get("/dashboard/metrics");
            setMetrics(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!metrics) return <div className="text-center mt-5">Loading Dashboard...</div>;

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Operational Dashboard</h2>
            
            {/* Filters UI (Bonus Visuals) */}
            <Card className="mb-4 p-3 bg-light">
                <Row>
                    <Col md={3}><Form.Control type="date" placeholder="Date" /></Col>
                    <Col md={3}><Form.Select><option>All Bases</option><option>Fort Alpha</option></Form.Select></Col>
                    <Col md={3}><Button variant="secondary" className="w-100">Apply Filters</Button></Col>
                </Row>
            </Card>

            <Row>
                <Col md={3}>
                    <Card className="text-white bg-primary mb-3">
                        <Card.Body>
                            <Card.Title>Total Assets</Card.Title>
                            <h3>{metrics.totalAssets}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-white bg-success mb-3">
                        <Card.Body>
                            <Card.Title>Active</Card.Title>
                            <h3>{metrics.activeAssets}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-white bg-warning mb-3">
                        <Card.Body>
                            <Card.Title>Assigned</Card.Title>
                            <h3>{metrics.assignedAssets}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-white bg-danger mb-3">
                        <Card.Body>
                            <Card.Title>Expended</Card.Title>
                            <h3>{metrics.expendedAssets}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="mt-4 text-center">
                <Card.Body>
                    <Card.Title>Net Movement Tracker</Card.Title>
                    <p className="lead">Purchases + Transfers In - Transfers Out</p>
                    <Button variant="outline-dark" onClick={() => setShowModal(true)}>
                        View Detailed Net Movement
                    </Button>
                </Card.Body>
            </Card>

            <NetMovementModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                data={metrics.movements} 
            />
        </Container>
    );
};

export default Dashboard;