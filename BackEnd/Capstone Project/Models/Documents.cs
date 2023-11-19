using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MongoDemo.Models
{
    public class Documents
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }  
        public string TenantId { get; set; } = string.Empty;    
        public string PropertyId { get; set; } = string.Empty;

        public string LandlordId { get; set; } = string.Empty;
        public string Doc1 { get; set; } = string.Empty;

        public string Doc2 { get; set; } = string.Empty;
        public bool isVerified { get; set; } = false;
    }
}
