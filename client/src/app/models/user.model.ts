export class UserModel {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

}
