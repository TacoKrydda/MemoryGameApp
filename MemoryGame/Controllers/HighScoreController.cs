using MemoryGame.Data.Models;
using MemoryGame.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighScoreController : ControllerBase
    {
        private readonly IHighScoreService _highScoreService;

        public HighScoreController(IHighScoreService highScoreService)
        {
            _highScoreService = highScoreService;
        }

        [HttpGet("GetHighScores")]
        public async Task<IActionResult> GetHighScores()
        {
            var higScores = await _highScoreService.GetAllHighScoresAsync();
            return Ok(higScores);
        }

        [HttpGet("GetTop5HighScores")]
        public async Task<IActionResult> GetTop5HighScores()
        {
            var higScores = await _highScoreService.GetTop5HighScoresAsync();
            return Ok(higScores);
        }

        [HttpPost("AddHighScore")]
        public async Task<IActionResult> AddHighScore(HighScore highScore)
        {
            await _highScoreService.AddHighScoreAsync(highScore);

            return Ok();
        }

        [HttpPut("UpdateHighScore")]
        public async Task<IActionResult> UpdateHighScore(HighScore highScore)
        {
            await _highScoreService.UpdateHighScoreAsync(highScore);
            return Ok();
        }

        [HttpDelete("DeleteHighScore")]
        public async Task<IActionResult> DeleteHighScore(int id)
        {
            await _highScoreService.DeleteHighScoreAsync(id);
            return Ok();
        }

        [HttpGet("GenerateRandomNumber")]
        public List<int> GenerateRandomNumberList()
        {
            return _highScoreService.GenerateRandomNumberList();
        }
    }
}
