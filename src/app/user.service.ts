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
  /*
 *  Stocker l’utilisateur connecté
    dans le LocalStorage du navigateur
    dans le UserService et connecter
    automatiquement l’utilisateur.

    Commençons par créer une méthode
    storeLoggedInUser(user)
    La méthode doit aussi se charger de stocker
    l’utilisateur passé en paramètre
    dans le LocalStorage
    qui offre la méthode setItem(key, value).
    Utilisez comme clé rememberMe.
    Méthode storeLoggedInUser(user)
    en cas de connexion réussie
    dans authenticate(),
    grâce à l’opérateur tap.
  * */
  storeLoggedInUser(user: UserModel): void {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }
  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrlAuth, credentials)
      .pipe(tap(user => this.storeLoggedInUser(user)));
   // .pipe(tap((user: UserModel) => this.userEvents.next(user)));
  }
  /*
  Utiliser le constructeur du
  service UserService
  une méthode retrieveUser()
  lire dans le LocalStorage de la
  valeur stockée
  avec JSON.parse() l’envoyer aux
  composants intéressés grâce à
  l’observable userEvents.
  */
  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value);
      this.userEvents.next(user);
    }
  }
}
