using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;
using MongoDemo.Services.PropertyService;
using MongoDemo.Services.ReviewService;

namespace MongoDemo.Controllers
{
    [Route("api/reviews/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {

        private readonly ReviewService _reviewservice;
        public ReviewsController(ReviewService _reviewservice)
        {
            this._reviewservice = _reviewservice;

        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Reviews> reviews = await _reviewservice.getAllReviews();
                return Ok(reviews);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                Reviews review = await _reviewservice.getReview(id);
                return Ok(review);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Authorize]
        [HttpPut]
        public IActionResult Put([FromBody] Reviews review)
        {
            try
            {
                 _reviewservice.updateReview(review);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                 _reviewservice.deleteReview(id);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
