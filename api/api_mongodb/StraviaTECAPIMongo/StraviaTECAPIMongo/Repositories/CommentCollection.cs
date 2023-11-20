using MongoDB.Bson;
using MongoDB.Driver;
using StraviaTECAPIMongo.Models;

namespace StraviaTECAPIMongo.Repositories
{
    public class CommentCollection : ICommentCollection
    {
        internal MongoDBRepository _repository = new MongoDBRepository();
        private IMongoCollection<Comment> Collection;

        public CommentCollection() 
        {
            Collection = _repository.db.GetCollection<Comment>("Comments");
        }
        public async Task DeleteComment(string id)
        {
            var filter = Builders<Comment>.Filter.Eq(s => s.Id, new ObjectId(id));
            await Collection.DeleteOneAsync(filter);
        }

        public async Task<List<Comment>> GetAllComments()
        {
            return await Collection.FindAsync(new BsonDocument()).Result.ToListAsync();
        }

        public async Task<Comment> GetCommentById(string id)
        {
            return await Collection.FindAsync(
                new BsonDocument { { "_id", new ObjectId(id) } }).Result.
                FirstAsync();
        }

        public async Task InsertComment(Comment comment)
        {
            await Collection.InsertOneAsync(comment);
        }

        public async Task UpdateComment(Comment comment)
        {
            var filter = Builders<Comment>
                .Filter
                .Eq(s => s.Id, comment.Id);

            await Collection.ReplaceOneAsync(filter, comment);
        }
    }
}
