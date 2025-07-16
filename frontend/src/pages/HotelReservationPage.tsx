import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelReservationPage: React.FC = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const rooms = [
    {
      id: 1,
      name: "Standard Room",
      description: "Cozy room with all basic amenities.",
      price: 89,
    },
    {
      id: 2,
      name: "Deluxe Room",
      description: "Spacious room with a view and king-sized bed.",
      price: 129,
    },
    {
      id: 3,
      name: "Suite",
      description: "Luxury suite with living area and balcony.",
      price: 199,
    },
  ];

 const handleBook = (roomId: number) => {
  if (!checkIn || !checkOut || !guests) {
    alert("Please select check-in, check-out dates and number of guests first.");
    return;
  }

  navigate("/book", {
    state: {
      roomId,
      checkIn,
      checkOut,
      guests,
    },
  });
};


  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        background: "#f4f4f4",
        height: "100vh",
        width:'100vw',
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
        <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>Test App</p>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem 2rem",
        }}
      >
        <section
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={{
                flex: "1 1 30%",
                minWidth: "150px", color:'black',
                backgroundColor:'white',
                padding: "0.6rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={{
                flex: "1 1 30%",
                minWidth: "150px",
                color:'black',
                backgroundColor:'white',
                padding: "0.6rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              style={{
                flex: "1 1 30%",
                minWidth: "100px", color:'black',
                backgroundColor:'white',
                padding: "0.6rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </section>
        <section style={{ marginTop: "2.5rem" }}>
          <h2 style={{ fontSize: "1.75rem", marginBottom: "1.2rem", color:'black' }}>
            Available Rooms
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {rooms.map((room) => (
              <div
                key={room.id}
                style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: "1 1 60%" }}>
                  <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem", color:'black'  }}>
                    {room.name}
                  </h3>
                  <p style={{ margin: 0, color: "#555" }}>{room.description}</p>
                </div>
                <div style={{ textAlign: "center", flex: "1 1 30%" }}>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#2b6cb0",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    ${room.price}/night
                  </p>
                  <button
                    onClick={() => handleBook(room.id)}
                    style={{
                      padding: "0.5rem 1.2rem",
                      backgroundColor: "#2b6cb0",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelReservationPage;
