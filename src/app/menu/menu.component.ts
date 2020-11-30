import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {concat, EMPTY, of, Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private router: Router) {
  }

  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  /*
  switchMap est l’opérateur approprié. Comme vous devez maintenant le savoir,
  il attend une fonction qui retourne un Observable. Si un utilisateur se connecte,
  c’est facile : il suffit d’en extraire son identifiant, d’appeler scoreUpdates
  et de retourner l’observable. Si l’utilisateur se déconnecte,
  nous n’avons plus d’utilisateur, et nous devons donc
  retourner un observable n’émettant qu’une valeur null : of(null)

  La logique de souscription est la même qu’auparavant :
  chaque fois qu’on reçoit un utilisateur, on l’affecte à la propriété user.
  nos deux observables. L’opérateur RxJS concat est là pour ça

  un autre événement de userEvents ne serait pas traité si un
  changement de score échoue.
  Pour réparer ça, il faut ajouter un opérateur catchError qui
  renverra un observable vide si une erreur survient
  (concat(of(user), scoreUpdates .pipe(catchError) ⇒ EMPTY))
   */

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents
      .pipe(switchMap(user => (user ? concat(of(user),
    this.userService.scoreUpdates(user.id)
      .pipe(catchError(() => EMPTY))) : of(null))))
      .subscribe(userWithScore => (this.user = userWithScore));
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
