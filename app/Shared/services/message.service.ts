import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Messages } from '../Models/ILogin';
import { messageUrl } from '../../constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient) { }

  setMessage(message : Messages){
    return this.http.put(messageUrl , message).subscribe();
  }
  getAllMessage() : Observable<Array<Messages>>{
   return this.http.get<Array<Messages>>(messageUrl);
  }
  getAllMessageByTenant(id : string) : Observable<Array<Messages>>{
    return this.http.get<Array<Messages>>(messageUrl + '/' + id);
   }


}
