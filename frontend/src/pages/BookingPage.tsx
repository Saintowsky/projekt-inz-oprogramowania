import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, checkIn, checkOut, guests } = location.state || {};

  const rooms = [
    {
      id: 1,
      name: "Standard Room",
      price: 89,
    },
    {
      id: 2,
      name: "Deluxe Room",
      price: 129,
    },
    {
      id: 3,
      name: "Suite",
      price: 199,
    },
  ];

  const room = rooms.find((r) => r.id === roomId);

  if (!room || !checkIn || !checkOut || !guests) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Missing reservation data</h2>
        <p>Please go back and select a room first.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#2b6cb0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const totalNights =
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
    (1000 * 60 * 60 * 24);
  const totalCost = totalNights * room.price;

  const handleConfirm = async () => {
    const payload = {
      roomId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      guests,
      totalCost,
    };

    try {
      const response = await fetch("http://localhost:5112/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Reservation failed");
      }

      navigate("/confirmation");
    } catch (error) {
      console.error("Error confirming reservation:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        fontFamily: "Segoe UI, sans-serif",
        background: "#f4f4f4",
        height: "100vh",
        justifyContent:'center',
        alignItems:'center',
        width:'100vw',
        margin: 0,
        padding: 0,
      }}
    >
       <header
        style={{
          backgroundColor: "#2b6cb0",
          width:'50%',
          color: "#fff",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Confirm your booking</h1>
      </header>
      <div
        style={{
          background: "#fff",
          padding: "1.5rem",
          width:'50%',
          color:'black',
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <p><strong>Room:</strong> {room.name}</p>
        <p><strong>Check-in:</strong> {checkIn}</p>
        <p><strong>Check-out:</strong> {checkOut}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Price per night:</strong> ${room.price}</p>
        <p><strong>Total nights:</strong> {totalNights || 0}</p>
        <hr style={{ margin: "1rem 0" }} />
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Total: ${isNaN(totalCost) ? 0 : totalCost.toFixed(2)}
        </p>

        <button
          onClick={handleConfirm}
          style={{
            marginTop: "1.5rem",
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#2b6cb0",
            color: "white",
            fontSize: "1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
