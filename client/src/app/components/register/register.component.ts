import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onRegisterSubmit(): void {
    const user: UserModel = new UserModel(
      this.firstName,
      this.lastName,
      this.email,
      this.password
    );

    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('All fields are mandatory!', { cssClass: 'alert alert-danger', timeout: 3000 });
      return;
    }

    // valid email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Use a valid email!', { cssClass: 'alert-danger', timeout: 3000 });
      return;
    }

    // register user
    this.authService.register(user).subscribe(
      (res) => {
        if (res.status === 201) {
          this.flashMessagesService.show('Successfully registered!', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger', timeout: 3000 });
      });
  }
}
