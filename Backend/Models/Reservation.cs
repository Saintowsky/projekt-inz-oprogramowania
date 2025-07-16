using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public string RoomName { get; set; } = string.Empty;

        [Required]
        public required string CheckIn { get; set; }

        [Required]
        public required string CheckOut { get; set; }

        [Range(1, 10)]
        public int Guests { get; set; }

        [Range(1, 100000)]
        public decimal TotalCost { get; set; }
    }
}