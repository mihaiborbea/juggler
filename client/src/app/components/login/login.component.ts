import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  public onLoginSubmit(): void {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(
      (res) => {
        if (res.status === 200) {
          this.authService.storeUserData(res.token, res.user);
          this.flashMessagesService.show('Successfully logged in!', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger', timeout: 3000 });
      });
  }

}
