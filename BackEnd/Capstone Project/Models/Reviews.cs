using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MongoDemo.Models
{
    public class Reviews
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string PropertyId { get; set; }
        public List<string> Review { get; set; }
        public List<int> Rating { get; set; }

        public List<string> userName { get; set; }
    }
}
