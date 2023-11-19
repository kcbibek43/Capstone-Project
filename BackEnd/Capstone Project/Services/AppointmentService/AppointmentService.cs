using MongoDB.Driver;
using MongoDemo.Models;

namespace MongoDemo.Services.AppointmentService
{
    public class AppointmentService
    {
        private readonly IMongoCollection<Appointment> _appointment;
        public AppointmentService(ISettings setting, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.Database);
            _appointment = database.GetCollection<Appointment>("Appointment");
        }

        public async Task<List<Appointment>> getAllAppointment() => await _appointment.Find(x => true).ToListAsync();

        public async Task<List<Appointment>> getAppointment(string Id) => await _appointment.Find(x => x.LandLordId == Id).ToListAsync();

        public void updateAppointment(Appointment appoint)
        {
            if (appoint.Id == "")
            {
                _appointment.InsertOne(appoint);
            }
            else
            {
                _appointment.ReplaceOne((x) => x.Id == appoint.Id, appoint);
            }

        }

        public void deleteAppointment(string Id)
        {
            _appointment.DeleteOne((x) => x.Id == Id);
        }

    }
}
