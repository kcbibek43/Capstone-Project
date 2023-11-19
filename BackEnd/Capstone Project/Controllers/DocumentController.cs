using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;
using MongoDemo.Services;
using MongoDemo.Services.MessageService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MongoDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {

        private readonly DocumentService _document;
        public DocumentController(DocumentService _document)
        {
            this._document = _document;

        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get( string id)
        {
            return Ok(_document.getDocsByProperty(id));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Documents doc)
        {
            _document.postDocument(doc);
            return Ok();

        }

        [Authorize]
        [HttpPut]
        public IActionResult Put( [FromBody] Documents doc)
        {
            _document.updateDocument(doc);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _document.deleteDocument(id);
            return Ok();
        }
    }
}
