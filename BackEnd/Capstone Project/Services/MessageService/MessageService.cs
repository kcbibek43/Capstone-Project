using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDemo.Models;

namespace MongoDemo.Services.MessageService
{
    public class MessageService : IMessageService
    {
        private readonly IMongoCollection<Messages> _database;

        public MessageService(ISettings setting, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _database = database.GetCollection<Messages>("Messages");
        }


        public async Task<List<Messages>> getAllMessages() =>  await _database.Find(x => true).ToListAsync();

        public void deleteMessage(string id)
        {
            _database.DeleteOne(x => x.Id == id);
        }

        public void addUpdateMessage(Messages userMessage){
            if (userMessage.Id == ""){
                _database.InsertOne(userMessage);
            }
            else
            {
                _database.ReplaceOne(x => x.Id == userMessage.Id,userMessage);
            }
        }

        public async Task<List<Messages>> getAMessage(string id) => await _database.Find(x => x.TenantId == id).ToListAsync();
    }
}
