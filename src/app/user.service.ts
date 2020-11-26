import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + 'users';
  private apiUrlAuth = environment.apiUrl + 'users/authentication';
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) { this.retrieveUser(); }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const params = {login, password, birthYear};
    return this.http.post<UserModel>(this.apiUrl, params);
  }

  storeLoggedInUser(user: UserModel): void {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
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
      this.userEvents.next(user);
    }
  }
  /*
  * Lorsque l’utilisateur clique sur le lien,
  * appelez la méthode logout à créer dans votre composant.
  * Cette méthode appellera à son tour une méthode logout
  * sur le service UserService, qui devra :
  émettre null dans l’observable userEvents pour
  * prévenir les composants de la déconnexion
  supprimer la valeur stockée dans le LocalStorage
  * */
  logout(): void {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
  }
}
