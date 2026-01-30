import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppNavbar from "./components/AppNavbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          
          <Route path="/purchases" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}><Purchases /></ProtectedRoute>
          } />
          
          <Route path="/transfers" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}><Transfers /></ProtectedRoute>
          } />
          
          <Route path="/assignments" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'COMMANDER']}><Assignments /></ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;