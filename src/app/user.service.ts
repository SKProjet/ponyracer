import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import {tap} from 'rxjs/operators';
import { JwtInterceptor } from './jwt.interceptor';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl + '/api/users';
  private apiUrlAuth = environment.baseUrl + '/api/users/authentication';
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient, private jwtInterceptor: JwtInterceptor, private wsService: WsService) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const params = {login, password, birthYear};
    return this.http.post<UserModel>(this.baseUrl, params);
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

  /*
  * WebSocket /player/{myUserId}. Créez une méthode scoreUpdates dans le UserService,
  * qui prend un userId en argument,
  * utilise le WsService pour se connecter au canal de communication, et retourne l’observable créé
  * */
  scoreUpdates(userId: number): Observable<UserModel> {
    return this.wsService.connect<UserModel>( '/player/' + userId);
  }

}
