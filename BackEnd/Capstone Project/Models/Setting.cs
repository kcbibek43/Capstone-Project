namespace MongoDemo.Models
{
    public class Setting : ISettings
    {
        public string ConnectionString { get; set; }
        public string Database { get; set ; }
    }
}
