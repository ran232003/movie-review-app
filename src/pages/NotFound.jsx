import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
