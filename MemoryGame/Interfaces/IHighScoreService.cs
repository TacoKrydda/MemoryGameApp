using MemoryGame.Data.Models;

namespace MemoryGame.Interfaces
{
    public interface IHighScoreService
    {
        Task<IEnumerable<HighScore>> GetAllHighScoresAsync();
        Task<IEnumerable<HighScore>> GetTop5HighScoresAsync();
        Task<HighScore> GetHighScoreByIdAsync(int id);
        Task AddHighScoreAsync(HighScore highScore);
        Task UpdateHighScoreAsync(HighScore highScore);
        Task DeleteHighScoreAsync(int id);
        List<int> GenerateRandomNumberList(int size);
        int CalculateHighScore(int totalAttempts, int ClearTime);
    }
}
