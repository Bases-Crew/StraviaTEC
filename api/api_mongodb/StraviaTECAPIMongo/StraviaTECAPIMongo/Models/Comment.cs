using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace StraviaTECAPIMongo.Models
{
    public class Comment
    {
        [BsonId]
        [JsonIgnore]
        public ObjectId Id { get; set; }
        public string Auser { get; set; }
        public int Actid { get; set; }
        public string Content { get; set; }
    }
}
