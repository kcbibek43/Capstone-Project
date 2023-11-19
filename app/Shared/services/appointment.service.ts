import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../Models/ILogin';
import { appointmentUrl } from '../../constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http : HttpClient) { }

  setAppointment(appointment : Appointment){
    return this.http.put(appointmentUrl , appointment).subscribe();
  }
  getAllAppointments() : Observable<Array<Appointment>>{
   return this.http.get<Array<Appointment>>(appointmentUrl);
  }
  getAllAppointmentsByLandLord(id : string) : Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(appointmentUrl + '/' + id);
   }
}
