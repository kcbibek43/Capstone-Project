using Newtonsoft.Json;

namespace MongoDemo.Models
{
    public class IMessage
    {
        public DateTime date { get; set; } = DateTime.Now;

        public string From { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

}
