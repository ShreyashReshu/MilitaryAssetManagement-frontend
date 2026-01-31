import { Modal, Button, Table, Badge } from 'react-bootstrap';

const AssetDetailModal = ({ show, handleClose, title, assets }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>{title} Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!assets || assets.length === 0 ? (
                    <p className="text-center text-muted p-4">No assets found in this category.</p>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <Table striped hover responsive className="mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Asset Name</th>
                                    <th>Serial #</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map(asset => (
                                    <tr key={asset.id}>
                                        <td>#{asset.id}</td>
                                        <td className="fw-bold">{asset.name}</td>
                                        <td>{asset.serialNumber}</td>
                                        <td><Badge bg="secondary">{asset.type}</Badge></td>
                                        <td>
                                            <Badge bg={
                                                asset.status === 'ACTIVE' ? 'success' : 
                                                asset.status === 'ASSIGNED' ? 'warning' : 'danger'
                                            }>
                                                {asset.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssetDetailModal;