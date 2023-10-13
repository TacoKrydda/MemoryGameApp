using MemoryGame.Data.Context;
using MemoryGame.Data.Models;
using MemoryGame.Interfaces;

namespace MemoryGame.Services
{
    public class HighScoreService : IHighScoreService
    {
        private readonly IHighScoreRepository _highScoreRepository;

        public HighScoreService(IHighScoreRepository highScoreRepository)
        {
            _highScoreRepository = highScoreRepository;
        }

        public async Task AddHighScoreAsync(HighScore highScore)
        {
            await _highScoreRepository.AddHighScoreAsync(highScore);
        }

        public int CalculateHighScore(int totalAttempts, int ClearTime)
        {
            int scoreMultiplier = 100; // Apply a scaling factor of 100, for bigger highscore
            double inverseAttempts = 1.0 / totalAttempts;
            double timeScore = ClearTime;
            double highScore = inverseAttempts * timeScore * scoreMultiplier;

            int roundedScore = (int)Math.Ceiling(highScore);

            return roundedScore;
        }

        public async Task DeleteHighScoreAsync(int id)
        {
            try
            {
                await _highScoreRepository.DeleteHighScoreAsync(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<int> GenerateRandomNumberList(int size)
        {
            List<int> availableNumbers = new List<int>();
            for (int i = 1; i <= size; i++)
            {
                availableNumbers.Add(i);
            }
            List<int> randomNumbers = new List<int>(availableNumbers.Count);
            Random random = new Random();

            while (availableNumbers.Count > 0)
            {
                int randomIndex = random.Next(availableNumbers.Count);
                randomNumbers.Add(availableNumbers[randomIndex]);
                availableNumbers.RemoveAt(randomIndex);
            }

            return randomNumbers;
        }

        public async Task<IEnumerable<HighScore>> GetAllHighScoresAsync()
        {
            return await _highScoreRepository.GetAllHighScoresAsync();
        }

        public async Task<HighScore> GetHighScoreByIdAsync(int id)
        {
            try
            {
                return await _highScoreRepository.GetHighScoreByIdAsync(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Task<IEnumerable<HighScore>> GetTop5HighScoresAsync()
        {
            return _highScoreRepository.GetTop5HighScoresAsync();
        }

        public async Task UpdateHighScoreAsync(HighScore highScore)
        {
            await _highScoreRepository.UpdateHighScoreAsync(highScore);
        }

    }
}
