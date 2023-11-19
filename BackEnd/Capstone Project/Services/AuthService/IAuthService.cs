using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;

namespace MongoDemo.Services.AuthService
{
    public interface IAuthService
    {
        public Task<User> Login(string email, string password);
        public Task<User> Register(User user);

        public Task<User> RegiserUser(User user);

        public void insertUser(User user);
    }
}
