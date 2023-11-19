using Microsoft.AspNetCore.Mvc.ViewEngines;
using MongoDB.Driver;
using MongoDemo.Models;

namespace MongoDemo.Services.ReviewService
{
    public class ReviewService
    {
        private readonly IMongoCollection<Reviews> _review;
        public ReviewService(ISettings setting, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _review = database.GetCollection<Reviews>("Reviews");
        }

        public async Task<List<Reviews>> getAllReviews() => await _review.Find(x => true).ToListAsync();

        public async Task<Reviews> getReview(string Id) => await _review.Find(x => x.PropertyId == Id).FirstOrDefaultAsync();

        public void updateReview(Reviews review)
        {
            if(review.Id == "")
            {
                _review.InsertOne(review);
            }
            else
            {
            _review.ReplaceOne((x)=>x.Id==review.Id,review);
            }

        }

        public void deleteReview(string Id)
        {
            _review.DeleteOne((x) => x.Id == Id);
        }
    }
}
