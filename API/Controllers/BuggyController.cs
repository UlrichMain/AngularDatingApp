using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController(DataContext context) : BaseApiController
    {
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "secret_text";
        }


        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var thing = context.Users.Find(-1);

            return NotFound();
        }


        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {
            var thing = context.Users.Find(-1) ?? throw new NullReferenceException();

            return thing;
        }


        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }
    }
}
