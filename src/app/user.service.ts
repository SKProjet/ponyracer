import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel} from './models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + 'users';
  private apiUrlAuth = environment.apiUrl + 'users/authentication';

  constructor(private http: HttpClient) {}

    register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const params = { login, password, birthYear };
    return this.http.post<UserModel>(this.apiUrl, params);
  }

    authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrlAuth, credentials);
  }
}
