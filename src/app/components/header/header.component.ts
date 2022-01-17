import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import {
  loginUserRequest,
  logoutUserRequest,
} from 'src/app/state/match/match.actions';
import { isLoggedIn } from 'src/app/state/match/match.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private userService: UserService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(isLoggedIn)
      .subscribe((status) => (this.isLoggedIn = status));
    this.isLoggedIn = this.userService.checkUser();
  }

  logoutUser() {
    this.isLoggedIn = false;
    this.store.dispatch(logoutUserRequest());
  }
}
