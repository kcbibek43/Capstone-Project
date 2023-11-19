using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Owin.Security.Provider;
using MongoDemo.Models;
using MongoDemo.Services.AppointmentService;

namespace MongoDemo.Controllers
{
    [Route("api/appointment/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _appointment;

        public AppointmentController(AppointmentService appointment)
        {
            _appointment = appointment;
        }

        
        [HttpGet]
        [Authorize]
        public async Task <IActionResult> Get()
        {
            try
            {
                var appointment = new List<Appointment>();
                appointment = await _appointment.getAllAppointment();
                return Ok(appointment); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                List<Appointment> appointment = await _appointment.getAppointment(id);
                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize]
        [HttpPut]
        public IActionResult Put( [FromBody]Appointment appoint )
        {
            try
            {
              _appointment.updateAppointment(appoint);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                _appointment.deleteAppointment(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
