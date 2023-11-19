using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDemo.Models;
using System.Linq;

namespace MongoDemo.Services.UserService
{
    public class UserService
    {
        private readonly IMongoCollection<User> _database;
        private readonly IMongoCollection<UserDetails> _users;
        public UserService(ISettings setting, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _database = database.GetCollection<User>("Tenants");
            _users = database.GetCollection<UserDetails>("UserInfo");
        }

        public UserRegistred getUserDetail(string Id)
        {
           var getuser =  _database.Find(x => x.Id == Id).FirstOrDefault();
            UserRegistred userDetail = new UserRegistred();
            userDetail.UserName = getuser.UserName;
            userDetail.Name = getuser.Name;
            userDetail.Email = getuser.Email;
            userDetail.Id = Id;
            return userDetail;
        }

        public UserDetails GetUser(string Id)
        {
            return _users.Find(x => x.UserId == Id).FirstOrDefault();
        }

        public void AddUser(UserDetails user){
            if (user.Id == "") {
                User updateUserOne = _database.Find(x => x.Id == user.UserId).FirstOrDefault();
                updateUserOne.UserName = user.UserName;
                updateUserOne.Name = user.Name;
                _database.ReplaceOne(x => x.Id == updateUserOne.Id, updateUserOne);
                _users.InsertOne(user);
            }
            else
            {
                User updateUserOne = _database.Find(x => x.Id == user.UserId).FirstOrDefault();
                updateUserOne.UserName = user.UserName;
                updateUserOne.Name = user.Name;
                _database.ReplaceOne(x => x.Id == updateUserOne.Id, updateUserOne);
                _users.ReplaceOne(element => element.Id == user.Id, user);
            }
        }

        public void UpdateUser(string id ,UserDetails user){
            _users.ReplaceOne(element => element.Id == id, user);
        }
    }
}
