using MongoDemo.Models;
using MongoDemo.Models;

namespace MongoDemo.Services.PropertyService
{
    public interface IPropertyService
    {
        public Task<List<Property>> GetAllProperty();

        public void insertProperty(Property property);

        public List<Property> GetPropertyById(string Id);

        public void deleteProperty(string Id);

        public void updateProperty(Property property,string Id);
        public Task<List<Property>> GetAllPropertyByLandlord(string Id);
    }
}
