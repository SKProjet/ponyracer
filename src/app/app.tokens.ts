import { InjectionToken, Type } from '@angular/core';
import * as Webstomp from 'webstomp-client';

/*
* deux tokens pour ces deux dépendances, et les associer aux objets globaux WebSocket and Webstomp.
* Pour cela, créez un fichier app.tokens.ts contenant les deux InjectionToken suivants,
* qui est la classe recommandée pour créer ces tokens
* */

export const WEBSOCKET = new InjectionToken<Type<WebSocket>>(
  'WebSocket', {
    providedIn: 'root',
    factory: () => WebSocket
  });

export const WEBSTOMP = new InjectionToken<unknown>(
  'Webstomp', {
    providedIn: 'root',
    factory: () => Webstomp
  });
