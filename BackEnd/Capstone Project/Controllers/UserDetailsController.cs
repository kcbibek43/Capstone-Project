using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDemo.Models;
using MongoDemo.Services.UserService;

namespace MongoDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly UserService _userService;

        public UserDetailsController(UserService userService)
        {
            _userService = userService;
        }


        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var user = _userService.GetUser(id);
            return Ok(user);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] UserDetails user)
        {
            _userService.AddUser(user);
            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(string id,[FromBody] UserDetails user)
        {
            _userService.UpdateUser(id,user);
            return Ok();
        }
    }
}
