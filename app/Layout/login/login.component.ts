import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StrongPasswordRegx } from '../../constants/constant';
import { AuthServiceService } from '../../Shared/services/auth-service.service';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/Shared/services/user-info.service';
import { Login, Register } from 'src/app/Shared/Models/ILogin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selected: boolean = true;
  login: boolean = true;
  data: string = 'Home';
  dataInt: number = 1;
  loginUserRole!: Login;
  registerUserRole!: Register;
  loginFormGroup!: FormGroup;
  registerFormGroup!: FormGroup;
  showPassWord: boolean = false;
  constructor(
    private loginFb: FormBuilder,
    private registerFb: FormBuilder,
    private authService: AuthServiceService,
    private route: Router,
    private service: UserInfoService,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loginFormGroup = this.loginFb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      password: ['', [Validators.required]],
    });

    this.registerFormGroup = this.registerFb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.email],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(StrongPasswordRegx)],
      ],
    });
  }
  styleButton(data: number) {
    this.dataInt = data;

    console.log(this.dataInt);
    if (data === 1) {
      this.selected = true;
      this.data = 'Home';
    } else {
      this.selected = false;
      this.data = 'Tenants';
    }
  }

  selectFunction(data: string) {
    this.showPassWord = false;
    this.registerFormGroup.reset();
    this.loginFormGroup.reset();
    if (data == 'Login') {
      this.login = true;
    } else {
      this.login = false;
    }
  }
  changeType() {
    this.showPassWord = !this.showPassWord;
  }

  loginUser() {
    if (this.loginFormGroup.valid) {
      console.log(this.loginFormGroup.value);
      this.authService.loginUser(this.loginFormGroup.value).subscribe(
        (res: any) => {
          console.log(res);
          console.log(res.statusCode);
          if (res.statusCode === 200) {
            console.log(res);
            const userId = res.headers[0].value[0];
            const userToken = res.headers[1].value[0];
            this.service.getUserInfo(userId);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userToken', userToken);
            if (this.dataInt === 1) {
              sessionStorage.setItem('Role', 'Tenant');
            } else {
              sessionStorage.setItem('Role', 'Landlord');
            }
            this.route.navigate(['Home']);
          }
        },
        (error: any) => {
          if (error.status === 400) {
            this.openSnackBar1(error.error.message);
          } else {
            this.openSnackBar1('Server Error ..!');
          }
        }
      );
    }
  }
  registerUser() {
    if (this.registerFormGroup.valid) {
      const user = this.registerFormGroup.value;

      if (this.dataInt === 1) {
        user.role = "Tenant";
        sessionStorage.setItem('Role', 'Tenant');
      } else {
        user.role = "Landlord";
        sessionStorage.setItem('Role', 'Landlord');
      }
      console.log(user);
      this.authService.registerUser(user).subscribe(
        (res: any) => {
          this.openSnackBar1("User Registered Sucessfully...!");
          this.selectFunction("Login");
        },
        (error) => {
          if (error.status === 400) {
            this.openSnackBar1(error.error.message);
          } else {
            this.openSnackBar1('Server Error ...!');
          }
        }
      );
    }
  }

  openSnackBar1(res: string) {
    this._snackbar.open(res, 'X', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
