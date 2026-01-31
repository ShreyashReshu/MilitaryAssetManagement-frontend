import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import API from "../api";
import NetMovementModal from "../components/NetMovementModal";

const Dashboard = () => {
    const [allAssets, setAllAssets] = useState([]);
    const [history, setHistory] = useState([]);
    const [selectedBase, setSelectedBase] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [metrics, setMetrics] = useState({ total: 0, active: 0, assigned: 0, expended: 0 });
    const [movements, setMovements] = useState({ purchases: 0, transfersIn: 0, transfersOut: 0 });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { 
        fetchData(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const assetsRes = await API.get("/assets");
            const historyRes = await API.get("/assets/transfers/history");
            setAllAssets(assetsRes.data);
            setHistory(historyRes.data);
            calculateMetrics(assetsRes.data, historyRes.data, "All", "All");
        } catch (err) { console.error(err); }
    };

    const calculateMetrics = (assets, logs, baseFilter, typeFilter) => {
        let filteredAssets = assets;
        
        if (baseFilter !== "All") {
            filteredAssets = filteredAssets.filter(a => a.currentBase?.id.toString() === baseFilter);
        }
        if (typeFilter !== "All") {
            filteredAssets = filteredAssets.filter(a => a.type === typeFilter);
        }

        let tIn = 0, tOut = 0;
        if (baseFilter !== "All") {
            const baseName = baseFilter === "1" ? "Fort Alpha" : "Camp Bravo";
            tIn = logs.filter(l => l.destBase === baseName).length;
            tOut = logs.filter(l => l.sourceBase === baseName).length;
        } else {
            tIn = logs.length; tOut = logs.length;
        }

        setMetrics({
            total: filteredAssets.length,
            active: filteredAssets.filter(a => a.status === 'ACTIVE').length,
            assigned: filteredAssets.filter(a => a.status === 'ASSIGNED').length,
            expended: filteredAssets.filter(a => a.status === 'EXPENDED').length,
        });
        setMovements({ purchases: filteredAssets.length, transfersIn: tIn, transfersOut: tOut });
    };

    const handleApplyFilters = () => calculateMetrics(allAssets, history, selectedBase, selectedType);

    return (
        <Container className="mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Operational Dashboard</h2>
                <Badge bg="success">System Online</Badge>
            </div>
            
            <Card className="mb-4 p-4 shadow-sm border-0 bg-light">
                <Row className="g-3">
                    <Col md={3}><Form.Label>Base Filter</Form.Label>
                        <Form.Select onChange={(e) => setSelectedBase(e.target.value)}>
                            <option value="All">All Bases</option>
                            <option value="1">Fort Alpha</option>
                            <option value="2">Camp Bravo</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}><Form.Label>Type Filter</Form.Label>
                        <Form.Select onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="All">All Types</option>
                            <option value="WEAPON">Weapons</option>
                            <option value="VEHICLE">Vehicles</option>
                        </Form.Select>
                    </Col>
                    <Col md={3} className="d-flex align-items-end">
                        <Button variant="primary" className="w-100" onClick={handleApplyFilters}>Apply Filters</Button>
                    </Col>
                </Row>
            </Card>

            <Row className="g-4 mb-4">
                <Col md={3}><Card className="text-white bg-primary h-100 shadow"><Card.Body className="text-center"><h6>Total Assets</h6><h1 className="display-4 fw-bold">{metrics.total}</h1></Card.Body></Card></Col>
                <Col md={3}><Card className="text-white bg-success h-100 shadow"><Card.Body className="text-center"><h6>Active</h6><h1 className="display-4 fw-bold">{metrics.active}</h1></Card.Body></Card></Col>
                <Col md={3}><Card className="text-white bg-warning h-100 shadow"><Card.Body className="text-center text-dark"><h6>Assigned</h6><h1 className="display-4 fw-bold">{metrics.assigned}</h1></Card.Body></Card></Col>
                <Col md={3}><Card className="text-white bg-danger h-100 shadow"><Card.Body className="text-center"><h6>Expended</h6><h1 className="display-4 fw-bold">{metrics.expended}</h1></Card.Body></Card></Col>
            </Row>

            <Card className="text-center border-0 shadow-sm"><Card.Body>
                <h5 className="text-primary">Net Movement Tracker</h5>
                <p className="text-muted">Calculated as: Purchases + Transfers In - Transfers Out</p>
                <Button variant="outline-dark" onClick={() => setShowModal(true)}>View Breakdown</Button>
            </Card.Body></Card>

            <NetMovementModal show={showModal} handleClose={() => setShowModal(false)} data={{ purchases: movements.purchases, transfers: movements.transfersIn }} />
        </Container>
    );
};
export default Dashboard;