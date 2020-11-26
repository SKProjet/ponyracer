import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import {tap} from 'rxjs/operators';

/*
UserService soit en charge d’exposer
un Subject nommé userEvents.
méthode next() pour émettre un événement.

  Pour faire ceci,
 chaînez un appel à l’opérateur tap,
 qui permet d’effectuer une action sans
 modifier l’événement renvoyé (comme le fait map).

*/

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + 'users';
  private apiUrlAuth = environment.apiUrl + 'users/authentication';
  userEvents = new Subject<UserModel>();

  constructor(private http: HttpClient) {
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const params = {login, password, birthYear};
    return this.http.post<UserModel>(this.apiUrl, params);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrlAuth, credentials)
      .pipe(tap((user: UserModel) => this.userEvents.next(user)));
  }
}
