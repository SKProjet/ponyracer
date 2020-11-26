import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }
  user: UserModel;
  userEventsSubscription: Subscription;

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
