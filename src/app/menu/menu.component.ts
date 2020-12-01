import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {concat, EMPTY, Observable, of, Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';
import {catchError, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
  }

  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  userEvents: Observable<UserModel>;

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
    this.userEvents = this.userService.userEvents
      .pipe(switchMap(user => (user ? concat(of(user),
    this.userService.scoreUpdates(user.id)
      .pipe(catchError(() => EMPTY))) : of(null))), shareReplay());
  }
/*
  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }*/
  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
