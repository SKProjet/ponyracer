import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';

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

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(
      user => (this.user = user));
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
