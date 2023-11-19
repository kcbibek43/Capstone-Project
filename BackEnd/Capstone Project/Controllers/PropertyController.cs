using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;
using MongoDemo.Services.AuthService;
using MongoDemo.Services.PropertyService;

namespace MongoDemo.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        public PropertyController(IPropertyService propertyService)
        {
               this._propertyService = propertyService;

        }

        [Authorize]
        [HttpGet]
        public async  Task<List<Property>> Get()
        {
            List<Property> properties = await _propertyService.GetAllProperty();
            return properties;
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var property =  _propertyService.GetPropertyById(id);
            return Ok(property);
        }


        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Property property)
        {
            _propertyService.insertProperty(property);
            return Ok();
        }


        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody]Property property)
        {
            _propertyService.updateProperty(property,id);
            return Ok();
        }


        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _propertyService.deleteProperty(id);
            return Ok();

        }
    }
}
