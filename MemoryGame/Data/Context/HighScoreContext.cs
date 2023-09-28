using MemoryGame.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace MemoryGame.Data.Context
{
    public class HighScoreContext : DbContext
    {
        public HighScoreContext(DbContextOptions<HighScoreContext> dbContextOptions) : base(dbContextOptions) { }

        public DbSet<HighScore> HighScores { get; set; }
    }
}
