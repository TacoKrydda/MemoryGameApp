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
