using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MongoDemo.Models
{
    public class Messages
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        public string TenantId { get; set; } = string.Empty;

        public string LandLordId { get; set; } = string.Empty;

        public List<IMessage> messages { get; set; } = new List<IMessage>();

    }

}
