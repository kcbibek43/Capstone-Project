using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MongoDemo.Models
{
    public class Property
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string LandLordId { get; set; } = string.Empty;

        public int Rent { get; set; }

        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int NumOfRooms { get; set; }
        public bool IsAvailable { get; set; } 
        public DateTime AvailableFrom { get; set; }

        public List<string>? Ameneties { get; set; } 

        public List<string>? Images { get; set; }

    }
}
