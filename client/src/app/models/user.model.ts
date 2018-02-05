export class UserModel {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) {
    this._id = id || '',
      this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.password = password || '';
  }

}
