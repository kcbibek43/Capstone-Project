import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login,Register } from '../Models/ILogin';
import { authUrl } from '../../constants/constant';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userRole : string = "";
  constructor(private http : HttpClient, private userService : UserInfoService) { }

  loginUser(user : Login){
    return this.http.post(authUrl+"/Login",user);
  }

  registerUser(user : Register){
    return this.http.post(authUrl+"/Register",user);
  }
}
