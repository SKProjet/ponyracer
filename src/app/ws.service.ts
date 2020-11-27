import { Inject, Injectable, Type } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Client, Subscription } from 'webstomp-client';
import { environment } from '../environments/environment';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(@Inject(WEBSOCKET) private WebSocket: Type<WebSocket>, @Inject(WEBSTOMP) private Webstomp: any) {}

  /* méthode est typé génériquement with <T>,
  permettant d’appeler avec ws.connect<UserModel>()
  et l'Observable retourné émet des événements de type UserModel

  new Observable(observer ⇒ { })
  permet de créer un Observable.
  La fonction passée en argument au constructeur
   est appelée la fonction subscribe
  */

  connect<T>(channel: string): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      /*  connexion WebSocket avec notre backend, nous utiliserons WebSocket,
      un objet directement fourni par le navigateur */
      const connection: WebSocket = new this.WebSocket(`${environment.wsBaseUrl}/ws`);
      const stompClient: Client = this.Webstomp.over(connection);
      let subscription: Subscription;
      stompClient.connect(
        { login: null, passcode: null },
        () => {
          subscription = stompClient.subscribe(channel, message => {
            const bodyAsJson = JSON.parse(message.body);
            observer.next(bodyAsJson);
          });
        },
        error => observer.error(error)
      );
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}
