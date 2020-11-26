import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  /*
  * Ajoutez un champ privé token dans le service,
  * qui contiendra notre token JWT. Maintenant,
  * dans la méthode intercept, si nous avons un token,
  * nous voulons ajouter un header à la requête avant
  * de la passer au prochain handler.
  * Ce nouveau header doit être nommé
  * Authorization et sa valeur doit être 'Bearer ' + token.
  *
  *  */
  private token: string | null;
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      const clone = request.clone({ setHeaders: { Authorization: `Bearer ${ this.token }` } });
      return next.handle(clone);
    }
    return next.handle(request);
  }

  /*
  etre capable de mettre à jour le token ou
   de le supprimer si besoin. Ajoutez une méthode
   setJwtToken(token: string) qui met à jour
   le champ privé token, et une méthode
   removeJwtToken() qui le remet à null.
   */

  setJwtToken(token: string): void {
    this.token = token;
  }

  removeJwtToken(): void {
    this.token = null;
  }
}
