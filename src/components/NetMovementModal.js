import { Modal, Table, Button } from 'react-bootstrap';

const NetMovementModal = ({ show, handleClose, data }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Net Movement Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-between mb-3">
                    <h5>Purchases: <span className="text-success">+{data.purchases}</span></h5>
                    <h5>Transfers In: <span className="text-primary">+{data.transfers}</span></h5>
                    {/* Assuming simplistic calculation for this demo since backend aggregates */}
                    <h5>Transfers Out: <span className="text-danger">-{data.transfers}</span></h5>
                </div>
                <p className="text-muted">Net Movement = (Purchases + Transfers In) - Transfers Out</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NetMovementModal;