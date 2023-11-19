using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;

namespace MongoDemo.Services.MessageService
{
    public interface IMessageService
    {
        public Task<List<Messages>> getAllMessages();

       public void deleteMessage(string id);
       public void addUpdateMessage(Messages userMessage);

        public Task<List<Messages>> getAMessage(string id);

    }
 }
