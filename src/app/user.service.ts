import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import {tap} from 'rxjs/operators';
import { JwtInterceptor } from './jwt.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Importez la constante environment du fichier environment.ts
  // dans user.service.ts, et modifiez les URLs en dur pour
  // utiliser la valeur environment.baseUrl.

  private baseUrl = environment.baseUrl + 'api/users';
  // private apiUrl = environment.apiUrl + 'users';
  private apiUrlAuth = environment.baseUrl + 'api/users/authentication';
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient, private jwtInterceptor: JwtInterceptor) { this.retrieveUser(); }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const params = {login, password, birthYear};
    return this.http.post<UserModel>(this.baseUrl, params);
    // return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, params);
  }

  storeLoggedInUser(user: UserModel): void {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.jwtInterceptor.setJwtToken(user.token);
    this.userEvents.next(user);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrlAuth, credentials)
      .pipe(tap(user => this.storeLoggedInUser(user)));
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value);
      this.jwtInterceptor.setJwtToken(user.token);
      this.userEvents.next(user);
    }
  }

  logout(): void {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
    this.jwtInterceptor.removeJwtToken();
  }
}
