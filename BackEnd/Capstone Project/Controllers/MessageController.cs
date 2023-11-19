using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDemo.Models;
using MongoDemo.Services.MessageService;

namespace MongoDemo.Controllers
{
    [Route("api/message/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageservice;
        public MessageController(IMessageService _messageservice)
        {
            this._messageservice = _messageservice;

        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Messages> messages = await _messageservice.getAllMessages();
                return Ok(messages);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Authorize]
        [HttpPut]
        public IActionResult Post([FromBody] Messages message)
        {
            try
            {
                 _messageservice.addUpdateMessage(message);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetId(string id)
        {
            try
            {
                List<Messages> message = await _messageservice.getAMessage(id);
                return Ok(message);
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
                _messageservice.deleteMessage(id);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
