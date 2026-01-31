import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">🛡️ Military Asset Sys</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        
                        {(user.role === 'ADMIN' || user.role === 'LOGISTICS') && (
                            <>
                                <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                                <Nav.Link as={Link} to="/transfers">Transfers</Nav.Link>
                            </>
                        )}

                        {(user.role === 'ADMIN' || user.role === 'COMMANDER') && (
                            <Nav.Link as={Link} to="/assignments">Assignments</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        <Badge bg="info" className="me-3 align-self-center">{user.role}</Badge>
                        <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;