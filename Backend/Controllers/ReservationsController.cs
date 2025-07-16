using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateReservation([FromBody] ReservationDto reservation)
        {
            // Log or save to DB here (mocked for now)
            Console.WriteLine("New Reservation:");
            Console.WriteLine($"Room: {reservation.RoomName}, Guests: {reservation.Guests}, Total: {reservation.TotalCost}");

            // Respond with success
            return Ok(new { message = "Reservation confirmed successfully." });
        }
    }
}
