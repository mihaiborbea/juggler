export class TodoModel {
  public _id: string;
  public title: string;
  public description: string;
  public date: Date;
  public status: string = 'pending';

  constructor() {
    this.title = '';
    this.description = '';
    this.date = new Date();
    this.status = '';
  }

}
