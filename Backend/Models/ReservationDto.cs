namespace Backend.Models
{
    public class ReservationDto
    {
        public int RoomId { get; set; }
        public string RoomName { get; set; } = string.Empty;
        public string CheckIn { get; set; } = string.Empty;
        public string CheckOut { get; set; } = string.Empty;
        public int Guests { get; set; }
        public decimal TotalCost { get; set; }
    }
}
