using MemoryGame.Data.Context;
using MemoryGame.Data.Models;
using MemoryGame.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemoryGame.Data.Repositories
{
    public class HighScoreRepository : IHighScoreRepository
    {
        private readonly HighScoreContext _highScoreContext;

        public HighScoreRepository(HighScoreContext highScoreContext)
        {
            _highScoreContext = highScoreContext;
        }

        public async Task AddHighScoreAsync(HighScore highScore)
        {
            await _highScoreContext.HighScores.AddAsync(highScore);
            await _highScoreContext.SaveChangesAsync();
        }

        public async Task DeleteHighScoreAsync(int id)
        {
            var highScore = await _highScoreContext.HighScores.FindAsync(id);
            if (highScore == null)
            {
                throw new NotImplementedException();
            }
            _highScoreContext.HighScores.Remove(highScore);
            await _highScoreContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<HighScore>> GetAllHighScoresAsync()
        {
            return await _highScoreContext.HighScores.ToListAsync();
        }

        public async Task<HighScore> GetHighScoreByIdAsync(int id)
        {
            var highScore = await _highScoreContext.HighScores.FindAsync(id);
            if (highScore == null)
            {
                throw new NotImplementedException();
            }
            return highScore;
        }

        public async Task<IEnumerable<HighScore>> GetTop5HighScoresAsync()
        {
            return await _highScoreContext.HighScores
                .OrderByDescending(score => score.TotalScore)
                .Take(5)
                .ToListAsync();
        }

        public async Task UpdateHighScoreAsync(HighScore highScore)
        {
            _highScoreContext.HighScores.Update(highScore);
            await _highScoreContext.SaveChangesAsync();
        }
    }
}
