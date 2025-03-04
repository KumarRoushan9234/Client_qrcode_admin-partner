import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const GoogleLoginComponent = () => {
  const responseGoogle = async (response) => {
    try {
      const { tokenId } = response;
      const { data } = await axios.post("/api/auth/google-login", {
        token: tokenId,
      });
      alert(data.message); // Show success message or handle as needed
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        className="w-full py-3 bg-red-600 text-white rounded-md"
      />
    </div>
  );
};

export default GoogleLoginComponent;
