using MongoDB.Driver;
using MongoDemo.Models;

namespace MongoDemo.Services
{
    public class DocumentService
    {
        private readonly IMongoCollection<Documents> _database;
        public DocumentService(ISettings setting, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _database = database.GetCollection<Documents>("Document");
        }


        public List<Documents> getDocsByProperty(string Id)
        {
            var doc = _database.Find(x => x.LandlordId == Id );
            List<Documents> document = doc.ToList();
            return document;
        }

        public void postDocument(Documents doc)
        {
            _database.InsertOne(doc);
        }

        public void updateDocument(Documents doc)
        {
            _database.ReplaceOne(x => x.Id == doc.Id, doc);
        }

        public void deleteDocument(string id)
        {
            _database.DeleteOne(x => x.Id == id);
        }

    }
}
