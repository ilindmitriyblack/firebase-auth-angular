import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firebaseLogin';
  actionType;
  userDetails;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.actionType = 'login';

  }

  ngOnInit(): void {
    this.isUserLoggedIn();
    if (!this.userDetails) {
      this.router.navigateByUrl('/auth');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
      });
  }

}
