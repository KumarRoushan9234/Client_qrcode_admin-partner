import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QRScanner from "./pages/QRScanner";
import QRGenerator from "./pages/QRGenerator";

export default function App() {
  return (
    <Router>
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <h1 className="text-lg">QR Check-in</h1>
        <div>
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/signup" className="mr-4">
            Signup
          </Link>
          <Link to="/qr-scanner" className="mr-4">
            Scan QR
          </Link>
          <Link to="/qr-generator">Generate QR</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/qr-generator" element={<QRGenerator />} />
      </Routes>
    </Router>
  );
}
