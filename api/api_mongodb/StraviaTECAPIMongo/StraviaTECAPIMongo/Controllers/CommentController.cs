using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StraviaTECAPIMongo.Models;
using StraviaTECAPIMongo.Repositories;

namespace StraviaTECAPIMongo.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentCollection db = new CommentCollection();

        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            return Ok(await db.GetAllComments());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentByID(string id)
        {
            return Ok(await db.GetCommentById(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] Comment comment)
        {
            if (comment == null)
                return BadRequest();

            if(comment.Auser == string.Empty)
            {
                ModelState.AddModelError("Auser", "User email shouldn't be empty");
            }

            await db.InsertComment(comment);

            return Created("Created", true);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment([FromBody] Comment comment, string id)
        {
            if (comment == null)
                return BadRequest();

            if (comment.Auser == string.Empty)
            {
                ModelState.AddModelError("Auser", "User email shouldn't be empty");
            }

            comment.Id = new MongoDB.Bson.ObjectId(id);
            await db.UpdateComment(comment);

            return Created("Updated", true);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(string id)
        {
            await db.DeleteComment(id);

            return NoContent();
        }
    }
}
