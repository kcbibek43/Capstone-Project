using MongoDemo.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
namespace MongoDemo.Services.AuthService
{
    
    using BCrypt.Net;
    using Microsoft.AspNetCore.Mvc;
    using MongoDB.Driver;
    using System.Security.Claims;
    using System.Text;

    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<User> _database;
        private readonly IConfiguration _configuration;
        public AuthService(ISettings setting, IMongoClient mongoClient, IConfiguration configuration)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _database = database.GetCollection<User>("Tenants");
            _configuration = configuration;
        }
        public async Task<User> Login(string email, string password)
        {
            var user =  await _database.Find(x => x.Email == email).FirstOrDefaultAsync();
            if ( (user == null || BCrypt.Verify(password, user.Password) == false))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.GivenName, user.Name),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            user.IsActive = true;
            return user;
        }


        public async Task<User> Register(User user)
        {   
            user.Password =  BCrypt.HashPassword(user.Password);
            return user;
        }

        public async Task<User> RegiserUser(User userRegister)
        {
            var user = await _database.Find(x => x.UserName == userRegister.UserName).FirstOrDefaultAsync();
            if (user == null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Email, userRegister.Email),
                    new Claim(ClaimTypes.GivenName, userRegister.Name),
                    new Claim(ClaimTypes.Role, userRegister.Role)
                    }),
                    IssuedAt = DateTime.UtcNow,
                    Issuer = _configuration["JWT:Issuer"],
                    Audience = _configuration["JWT:Audience"],
                    Expires = DateTime.UtcNow.AddSeconds(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                userRegister.Token = tokenHandler.WriteToken(token);
                userRegister.IsActive = true;
                return userRegister;
            }

            else
            {
                return null;
            }

        }


        public async void insertUser(User user)
        {
            await _database.InsertOneAsync(user);
        }
    }
}
