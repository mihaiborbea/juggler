import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  public onRegisterSubmit() {
    console.log(this.firstName);
  }

}
