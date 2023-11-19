namespace MongoDemo.Models
{
    public interface ISettings
    {
        string ConnectionString { get; set; }
        string Database { get; set; }
    }
}
