import { Injectable } from '@angular/core';
import { UserInfo } from '../Models/ILogin';
import { HttpClient } from '@angular/common/http';
import { authUrl, userUrl } from '../../constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  currentUser: UserInfo  = {
    id: '',
    name: '',
    userId: '',
    userName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    image: ''
  } ; 
  constructor(private http : HttpClient) {}

  updateUser(user : UserInfo){

    this.http.put(userUrl + "/" + user.id,user).subscribe(
      (data) =>{
        data = this.currentUser;
      }
    )
  }

  postUser(user : UserInfo){
    this.http.post(userUrl,user).subscribe(
      (data) => {
        data = this.currentUser;
      }
    );
  }


  getUserInfo(userId : string) : Observable<UserInfo>{
    return this.http.get<UserInfo>(userUrl+"/"+userId);
  }

  getUserName(userId : string){
    return this.http.get(authUrl + '/Get/' + userId);
  }

}
