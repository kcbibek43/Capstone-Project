import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../Shared/services/user-info.service';
import { UserInfo } from '../../Shared/Models/ILogin';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  src: any;
  user: UserInfo = {
    id: '',
    name: '',
    userId: '',
    userName: '',
    phone: "",
    street: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    image: '',
  };
  userForm!: FormGroup;
  constructor(private userService: UserInfoService, private fb: FormBuilder) {}

  convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  uploadImage = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);
    console.log(base64);
    this.src = base64;
  };
  
  ngOnInit() {
    this.userService.getUserInfo(sessionStorage.getItem("userId")!).subscribe(data=>{
      if(data!=null){
        this.user = data;
      }
      this.userForm = this.fb.group({
        name: [this.user.name, [Validators.required, Validators.minLength(4)]],
        userName: [
          this.user.userName,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        phone: [
          this.user.phone,
          [Validators.required, Validators.pattern('[0-9 ]{10}')],
        ],
        street: [
          this.user.street,
          [Validators.required, Validators.minLength(5)],
        ],
        city: [this.user.city, [Validators.required, Validators.minLength(5)]],
        state: [this.user.state, [Validators.required, Validators.minLength(5)]],
        zipCode: [
          this.user.zipCode,
          [Validators.required, Validators.pattern('[0-9]{5}')],
        ],
      });
    })
  
  }
  postData() {
    if (this.userForm.valid) {
      this.userService.getUserName(sessionStorage.getItem("userId")!).subscribe((data : any)=>{
        const image = this.src.toString();
        this.user.name = this.userForm.value.name;
        this.user.userName = this.userForm.value.userName;
        this.user.city = this.userForm.value.city;
        this.user.zipCode = this.userForm.value.zipCode;
        this.user.phone = this.userForm.value.phone;
        this.user.image = image;
        this.user.state = this.userForm.value.state;
        this.user.street = this.userForm.value.street;
        this.user.userId = sessionStorage.getItem("userId")!;
        this.user.email = data.email;
        this.user.userName = data.userName;
        console.log(this.user);
        this.userService.postUser(this.user);       
      })

    }
  }
}


