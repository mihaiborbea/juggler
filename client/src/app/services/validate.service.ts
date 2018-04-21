import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable()
export class ValidateService {

  constructor() { }

  public validateRegister(user: UserModel): boolean {
    if (user.firstName === (undefined || '') ||
      user.lastName === (undefined || '') ||
      user.email === (undefined || '') ||
      user.password === (undefined || '')) {
      return false;
    } else {
      return true;
    }
  }

  public validateEmail(email: string): boolean {
    // tslint:disable-next-line
    const regex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test(email);
  }
}
