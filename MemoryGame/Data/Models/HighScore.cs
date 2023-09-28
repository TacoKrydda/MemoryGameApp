namespace MemoryGame.Data.Models
{
    public class HighScore
    {
        public int Id { get; set; }
        public string PlayerName { get; set; } = string.Empty;
        public int TotalAttempts { get; set; }
        public int ClearTime { get; set; }
        public int TotalScore { get; set; }
    }
}
