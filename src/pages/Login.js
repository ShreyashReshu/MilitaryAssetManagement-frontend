import { useState, useContext } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import API from "../api";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { username, password });
            login(res.data.token, res.data.role);
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    const pageStyle = {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1c2331 0%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff"
    };

    const cardStyle = {
        width: "400px",
        borderRadius: "15px",
        border: "none",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        background: "rgba(255, 255, 255, 0.95)"
    };

    return (
        <div style={pageStyle}>
            <Container className="d-flex justify-content-center">
                <Card style={cardStyle} className="p-4">
                    <div className="text-center mb-4">
                        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🛡️</div>
                        <h3 className="fw-bold text-dark">COMMAND ACCESS</h3>
                        <p className="text-muted small">Military Asset Management System</p>
                    </div>

                    {error && <Alert variant="danger" className="text-center small">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-dark fw-bold small text-uppercase">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Your Username"
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                autoFocus
                                style={{ borderRadius: "8px", padding: "10px" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="text-dark fw-bold small text-uppercase">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Your Password"
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                style={{ borderRadius: "8px", padding: "10px" }}
                            />
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 fw-bold"
                            style={{ 
                                background: "#0f172a", 
                                border: "none", 
                                padding: "12px", 
                                borderRadius: "8px",
                                letterSpacing: "1px"
                            }}
                        >
                            SECURE LOGIN
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                            UNAUTHORIZED ACCESS IS PROHIBITED
                        </small>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Login;