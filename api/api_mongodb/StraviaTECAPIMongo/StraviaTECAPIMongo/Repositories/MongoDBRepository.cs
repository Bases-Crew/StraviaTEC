using MongoDB.Driver;

namespace StraviaTECAPIMongo.Repositories
{
    public class MongoDBRepository
    {
        public MongoClient client;

        public IMongoDatabase db;

        public MongoDBRepository() 
        {
            client = new MongoClient("mongodb://127.0.0.1:27017");

            db = client.GetDatabase("Comments");
        }
    }
}
