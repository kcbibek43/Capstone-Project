using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;
using MongoDemo.Services.AuthService;
using MongoDemo.Services.UserService;
using System.Net;

namespace MongoDemo.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserService _userService;

        public AuthController(IAuthService authService, UserService userService)
        {
            _authService = authService;
            _userService = userService;
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUser user)
        {
 

            User loggedInUser = await _authService.Login(user.Email, user.Password);
  
            if (loggedInUser != null){
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Headers.Add("userId", loggedInUser.Id);
                response.Headers.Add("token", loggedInUser.Token);
                return Ok(response);
            }

            return BadRequest(new { message = "Email or Password is wrong" });
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser user){

            User userToRegister = new(user.UserName,user.Email, user.Name, user.Password, user.Role);

            User registeredUser =  await _authService.Register(userToRegister);

            User loggedInUser = await _authService.RegiserUser(registeredUser);

 
            if (loggedInUser != null){
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Headers.Add("userId", loggedInUser.Id);
                response.Headers.Add("token", loggedInUser.Token);
                _authService.insertUser(loggedInUser);
                    return Ok(response);
            }
            
            return BadRequest(new { message = "User Already Exist" });
        }

        [HttpGet("{id}")]
        public UserRegistred Get(string id)
        {
            UserRegistred user =  _userService.getUserDetail(id);
            return user;
        }
    }
}
