import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import API from "../api";
import NetMovementModal from "../components/NetMovementModal";
import AssetDetailModal from "../components/AssetDetailModal";

const Dashboard = () => {
    const [allAssets, setAllAssets] = useState([]);
    const [history, setHistory] = useState([]);
    const [bases, setBases] = useState([]);

    const [selectedBase, setSelectedBase] = useState("All");
    const [selectedType, setSelectedType] = useState("All");

    const [metrics, setMetrics] = useState({ total: 0, active: 0, assigned: 0, expended: 0 });
    const [drillDownData, setDrillDownData] = useState([]); 
    const [modalTitle, setModalTitle] = useState("");
    
    const [showNetModal, setShowNetModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    const [movementData, setMovementData] = useState({ purchases: [], transfersIn: [], transfersOut: [] });

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
            
            const uniqueBases = [];
            const map = new Map();
            for (const item of assetsRes.data) {
                if (item.currentBase && !map.has(item.currentBase.id)) {
                    map.set(item.currentBase.id, true);
                    uniqueBases.push({ id: item.currentBase.id, name: item.currentBase.name });
                }
            }
            setBases(uniqueBases);

            calculateMetrics(assetsRes.data, historyRes.data, "All", "All");
        } catch (err) { console.error(err); }
    };

    const calculateMetrics = (assets, logs, baseFilter, typeFilter) => {
        let filtered = assets;
        
        // Apply Filters
        if (baseFilter !== "All") {
            filtered = filtered.filter(a => a.currentBase?.id.toString() === baseFilter);
        }
        if (typeFilter !== "All") {
            filtered = filtered.filter(a => a.type === typeFilter);
        }

        
        let tIn = [], tOut = [];
        if (baseFilter !== "All") {
            const baseObj = bases.find(b => b.id.toString() === baseFilter);
            const baseName = baseObj ? baseObj.name : "";
            
            tIn = logs.filter(l => l.destBase === baseName);
            tOut = logs.filter(l => l.sourceBase === baseName);
        } else {
            tIn = logs; tOut = logs;
        }

        setMetrics({
            total: filtered.length,
            active: filtered.filter(a => a.status === 'ACTIVE').length,
            assigned: filtered.filter(a => a.status === 'ASSIGNED').length,
            expended: filtered.filter(a => a.status === 'EXPENDED').length,
        });

        setDrillDownData(filtered); 

        setMovementData({ 
            purchases: filtered,
            transfersIn: tIn, 
            transfersOut: tOut 
        });
    };

    const handleApplyFilters = () => calculateMetrics(allAssets, history, selectedBase, selectedType);

    
    const openDetailModal = (category) => {
        let data = [];
        let filtered = drillDownData;
        switch(category) {
            case 'Active':
                data = filtered.filter(a => a.status === 'ACTIVE');
                break;
            case 'Assigned':
                data = filtered.filter(a => a.status === 'ASSIGNED');
                break;
            case 'Expended':
                data = filtered.filter(a => a.status === 'EXPENDED');
                break;
            default: 
                data = filtered;
        }
        setModalTitle(category);
        setDrillDownData(data); 
        setShowDetailModal(true);
    };

    return (
        <Container className="mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Operational Dashboard</h2>
                <Badge bg="success">System Online</Badge>
            </div>
            
            {/* FILTERS */}
            <Card className="mb-4 p-4 shadow-sm border-0 bg-light">
                <Row className="g-3">
                    <Col md={3}>
                        <Form.Label>Base Filter</Form.Label>
                        <Form.Select onChange={(e) => setSelectedBase(e.target.value)}>
                            <option value="All">All Bases</option>
                            {/* DYNAMIC BASES RENDERED HERE */}
                            {bases.map(base => (
                                <option key={base.id} value={base.id}>{base.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Label>Type Filter</Form.Label>
                        <Form.Select onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="All">All Types</option>
                            <option value="WEAPON">Weapons</option>
                            <option value="VEHICLE">Vehicles</option>
                            <option value="AMMUNITION">Ammunition</option>
                        </Form.Select>
                    </Col>
                    <Col md={3} className="d-flex align-items-end">
                        <Button variant="primary" className="w-100" onClick={handleApplyFilters}>Apply Filters</Button>
                    </Col>
                </Row>
            </Card>

            {/* CLICKABLE METRIC CARDS */}
            <Row className="g-4 mb-4">
                <Col md={3}>
                    <Card 
                        className="text-white bg-primary h-100 shadow card-hover" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => openDetailModal('Total Assets')}
                    >
                        <Card.Body className="text-center">
                            <h6>Total Assets</h6>
                            <h1 className="display-4 fw-bold">{metrics.total}</h1>
                            <small>Click to view list</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card 
                        className="text-white bg-success h-100 shadow card-hover"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openDetailModal('Active')}
                    >
                        <Card.Body className="text-center">
                            <h6>Active</h6>
                            <h1 className="display-4 fw-bold">{metrics.active}</h1>
                            <small>Click to view list</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card 
                        className="text-white bg-warning h-100 shadow card-hover"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openDetailModal('Assigned')}
                    >
                        <Card.Body className="text-center text-dark">
                            <h6>Assigned</h6>
                            <h1 className="display-4 fw-bold">{metrics.assigned}</h1>
                            <small>Click to view list</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card 
                        className="text-white bg-danger h-100 shadow card-hover"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openDetailModal('Expended')}
                    >
                        <Card.Body className="text-center">
                            <h6>Expended</h6>
                            <h1 className="display-4 fw-bold">{metrics.expended}</h1>
                            <small>Click to view list</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                    <h5 className="text-primary">Net Movement Tracker</h5>
                    <p className="text-muted">Calculated as: Purchases + Transfers In - Transfers Out</p>
                    <Button variant="outline-dark" onClick={() => setShowNetModal(true)}>View Breakdown</Button>
                </Card.Body>
            </Card>

            {/* Modals */}
            <NetMovementModal show={showNetModal} handleClose={() => setShowNetModal(false)} data={movementData} />
            
            <AssetDetailModal 
                show={showDetailModal} 
                handleClose={() => setShowDetailModal(false)} 
                title={modalTitle} 
                assets={drillDownData} 
            />
        </Container>
    );
};
export default Dashboard;