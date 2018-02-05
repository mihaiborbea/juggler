import { TodoModel } from '../models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000';
  todoUrl = `${this.api_url}/api/todos`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  createTodo(todo: TodoModel): Observable<any> {
    this.authService.loadUserData();
    const token = this.authService.authToken;
    const userId = this.authService.user._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'UserId': userId
      })
    };
    return this.http.post(this.todoUrl, todo, httpOptions);
  }

  getTodos(): Observable<TodoModel[]> {
    this.authService.loadUserData();
    const token = this.authService.authToken;
    const userId = this.authService.user._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'UserId': userId
      })
    };
    return this.http.get(this.todoUrl, httpOptions)
      .map(res => {
        return res['result'].docs as TodoModel[];
      });
  }

  editTodo(todo: TodoModel) {
    const editUrl = `${this.todoUrl}`;
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id: string): any {
    const deleteUrl = `${this.todoUrl}/${id}`;
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
