using StraviaTECAPIMongo.Models;

namespace StraviaTECAPIMongo.Repositories
{
    public interface ICommentCollection
    {
        Task InsertComment(Comment comment);
        Task UpdateComment(Comment comment);
        Task DeleteComment(string id);
        Task<List<Comment>> GetAllComments();
        Task<Comment> GetCommentById(string id);
    }
}
