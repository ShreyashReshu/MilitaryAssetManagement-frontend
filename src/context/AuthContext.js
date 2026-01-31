import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");
        if (token && savedRole) {
            setRole(savedRole);
            setUser({ role: savedRole });
        }
    }, []);

    const login = (token, userRole) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setRole(userRole);
        setUser({ role: userRole });
        navigate("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        setRole(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;