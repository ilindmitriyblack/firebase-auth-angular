import {Component} from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  actionType;
  responseMessage = '';
  responseMessageType = '';
  email;
  password;
  name;
  userDetails;


  constructor(
    private authService: AuthenticationService,

  ) {
    this.actionType = 'login';
  }


  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 3000);
  }

  onValChange(val: string) {
    this.showMessage("", "");
    this.actionType = val;
  }

  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }

  loginUser() {
    this.responseMessage = "";
    this.authService.login(this.email, this.password)
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In!");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("error", err.message);
      });
  }

  registerUser() {
    this.authService.register(this.email, this.password)
      .then(res => {
        this.setUserData(res.user);
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.showMessage("success", "Registration Successful! Please Verify Your Email");
        }, err => {
          this.showMessage("error", err.message);
        });
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("error", err.message);
      });
  }

  googleLogin() {
    this.authService.loginWithGoogle()
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In with Google");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("error", err.message);
      });
  }

  setUserData(user){
     return user.updateProfile(
      {
        displayName:this.name,
      }
    );
  }

}

