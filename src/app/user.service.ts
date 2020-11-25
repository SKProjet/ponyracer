import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel} from './models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
/*
* UserService, qui aura une méthode
* register(login, password, birthYear),
* qui attend trois paramètres:
* le login,
* le mot de passe
* et l’année de naissance.
* */
  private apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}

    register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const params = { login, password, birthYear };
    return this.http.post<UserModel>(this.apiUrl, params);
  }

}
