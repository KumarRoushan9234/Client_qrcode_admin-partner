import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import "./App.css"; // Tailwind is included in this CSS file

// Client ID for Google OAuth
const CLIENT_ID =
  "586550505768-fci4d1iasokpukngfmsccehopv7ct88l.apps.googleusercontent.com";

const App = () => {
  const [user, setUser] = useState(null);

  // Google Login Success Handler
  const handleLoginSuccess = async (response) => {
    const token = response.tokenId;

    try {
      // Send Google token to your backend for authentication
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { token }
      );
      setUser(res.data.user);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login!");
    }
  };

  // Google Login Failure Handler
  const handleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    alert("Login failed. Please try again.");
  };

  // Render the login screen if no user is authenticated
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          />
        </div>
      </div>
    );
  }

  // Render the logged-in user's info
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}</h2>
        <img
          src={user.profilePicture}
          alt="Profile"
          className="rounded-full w-24 h-24 mx-auto mb-4"
        />
        <p className="text-lg mb-4">{user.email}</p>
        <button
          onClick={() => setUser(null)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
