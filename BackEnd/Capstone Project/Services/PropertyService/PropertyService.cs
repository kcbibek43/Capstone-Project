using MongoDB.Bson;
using MongoDB.Driver;
using MongoDemo.Models;
using System.Collections.Generic;

namespace MongoDemo.Services.PropertyService
{
    public class PropertyService : IPropertyService
    {
        private readonly IMongoCollection<Property> _database;
        public PropertyService(ISettings setting, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _database = database.GetCollection<Property>("Properties");
        }

        public async Task<List<Property>> GetAllProperty()
        {
            var list = await _database.FindAsync(property => true);
            List<Property> properties = list.ToList();
            return properties;
        }

        public async Task<List<Property>> GetAllPropertyByLandlord(string Id)
        {
            var list = await _database.FindAsync(property => property.LandLordId == Id);
            List<Property> properties = list.ToList();
            return properties;
        }

        public void insertProperty(Property property) {
            _database.InsertOne(property);  
        }

        public List<Property> GetPropertyById(string Id)
        {

            var dummy = _database.Find(element => element.Id == Id).ToList();

            if (dummy.Count!=0)
            {
                List<Property> property = dummy.ToList();
                return property;
            }
            else
            {
                var list =  _database.Find(ele => ele.LandLordId == Id);
                List<Property> properties = list.ToList();
                return properties;
            }

        }


        public void deleteProperty(string Id)
        {
            _database.DeleteOne(element => element.Id==Id);
        }

        public void updateProperty(Property property,string Id)
        {
            _database.ReplaceOne(element => element.Id==Id, property);
        }
    }
}
