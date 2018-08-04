import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  public authToken: string;
  public user: UserModel;

  constructor(
    private http: HttpClient
  ) { }

  public loggedIn(): boolean {
    return tokenNotExpired('id_token');
  }

  public register(user: UserModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('http://localhost:3000/users/register', user, httpOptions)
      .map((res) => res)
      .pipe(catchError(this.handleError));
  }

  public login(userData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('http://localhost:3000/users/login', userData, httpOptions)
      .map((res) => res)
      .pipe(catchError(this.handleError));
  }

  public storeUserData(token, user): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('signed_user', JSON.stringify(user));
    this.authToken = token;
    this.user = new UserModel(
      user._id,
      user.firstName,
      user.lastName,
      user.email
    );
  }

  public loadUserData(): any {
    this.authToken = localStorage.getItem('id_token');
    const tempUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = new UserModel(
      tempUser._id,
      tempUser.firstName,
      tempUser.lastName,
      tempUser.email,
    );
  }

  public logout(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Basic error handling: to be improved later
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Invalid Input');
  }
}
