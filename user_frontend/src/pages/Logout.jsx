import { useState } from "react";
import axios from "axios";

const Logout = () => {
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setMessage("Logged out successfully");
    } catch (error) {
      setMessage("Error logging out");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Log Out
      </button>
      {message && <div className="mt-4 text-center">{message}</div>}
    </div>
  );
};

export default Logout;
