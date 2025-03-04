import { useState } from "react";
import axios from "axios";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/send-verification-email", { email });
      setMessage("Verification email sent!");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
      {error && <div className="text-red-500">{error}</div>}
      {message && <div className="text-green-500">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send Verification Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
