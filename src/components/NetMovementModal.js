import { Modal, Button, Table, Tabs, Tab, Badge } from 'react-bootstrap';

const NetMovementModal = ({ show, handleClose, data }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Net Movement Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-around mb-4 p-3 bg-white rounded shadow-sm border">
                    <div className="text-center">
                        <h6 className="text-muted">Purchases</h6>
                        <h4 className="text-success">+{data.purchases.length}</h4>
                    </div>
                    <div className="text-center border-start border-end px-4">
                        <h6 className="text-muted">Transfers In</h6>
                        <h4 className="text-primary">+{data.transfersIn.length}</h4>
                    </div>
                    <div className="text-center">
                        <h6 className="text-muted">Transfers Out</h6>
                        <h4 className="text-danger">-{data.transfersOut.length}</h4>
                    </div>
                </div>

                
                <Tabs defaultActiveKey="purchases" className="mb-3">
                    <Tab eventKey="purchases" title="Purchases / Inventory">
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Table size="sm" striped>
                                <thead><tr><th>Asset</th><th>Type</th><th>Base</th></tr></thead>
                                <tbody>
                                    {data.purchases.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.name}</td>
                                            <td><Badge bg="secondary">{p.type}</Badge></td>
                                            <td>{p.currentBase?.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="transfersIn" title="Transfers In (Incoming)">
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Table size="sm" striped>
                                <thead><tr><th>Asset</th><th>From</th><th>To</th><th>Date</th></tr></thead>
                                <tbody>
                                    {data.transfersIn.length === 0 ? <tr><td colSpan="4">No incoming transfers.</td></tr> : 
                                     data.transfersIn.map(t => (
                                        <tr key={t.id}>
                                            <td className="fw-bold">{t.assetName}</td>
                                            <td>{t.sourceBase}</td>
                                            <td className="text-success">{t.destBase}</td>
                                            <td>{new Date(t.timestamp).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="transfersOut" title="Transfers Out (Outgoing)">
                         <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Table size="sm" striped>
                                <thead><tr><th>Asset</th><th>From</th><th>To</th><th>Date</th></tr></thead>
                                <tbody>
                                    {data.transfersOut.length === 0 ? <tr><td colSpan="4">No outgoing transfers.</td></tr> : 
                                     data.transfersOut.map(t => (
                                        <tr key={t.id}>
                                            <td className="fw-bold">{t.assetName}</td>
                                            <td className="text-danger">{t.sourceBase}</td>
                                            <td>{t.destBase}</td>
                                            <td>{new Date(t.timestamp).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close Report</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NetMovementModal;