import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        background: "#f4f4f4",
        width: "100vw",
        height:'100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <header
        style={{
          backgroundColor: "#2b6cb0",
          color: "#fff",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Hotel Reservation</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>Confirmation</p>
      </header>
      <main
        style={{
          maxWidth: "700px",
          margin: "3rem auto",
          padding: "0 1rem",
        }}
      >
        <section
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#2b6cb0" }}>
            🎉 Thank You!
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#333" }}>
            Your reservation has been successfully confirmed.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "2rem",
              padding: "0.7rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#2b6cb0",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </section>
      </main>
    </div>
  );
};

export default ConfirmationPage;
