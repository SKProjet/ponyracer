import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {
  }


  navbarCollapsed = true;

  /*
  *
  * Dans le composant MenuComponent,
  * injectez le UserService.
  * Puis abonnez-vous à l’observable userEvents
  * exposé par celui-ci. Le meilleur endroit pour faire ceci
  * est dans la méthode ngOnInit. Lorsqu’un utilisateur
  * sera reçu, stockez-le dans une variable
  * locale au composant, nommée user.
  * */

  user: UserModel;
  userEventsSubscription: Subscription;

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(
      user => (this.user = user));
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

}
