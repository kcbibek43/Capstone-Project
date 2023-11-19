using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDemo.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; } = string.Empty;

        public string UserName { get; set; }
        public string Token { get; set; }

        public bool IsActive { get; set; }

           public User(string userName, string email,string name, string password, string role){
            Email = email;
            UserName = userName;
            Name = name;
            Password = password;
            Role = role;
        }

    }


    public class LoginUser
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class RegisterUser
    {
        public string Name { get; set; } = "";

        public string Email { get; set; } = "";
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public string Role { get; set; } = "Everyone";
    }

    public class UserRegistred { 
        public string Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }
        
    }

    public class UserDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Phone { get; set; }    

        public string Street { get; set; }

        public string city { get; set; }   
        public string State { get; set; }  
        public string ZipCode { get; set; }   

        public string Email { get; set; }

        public string image {  get; set; }
    }
}
