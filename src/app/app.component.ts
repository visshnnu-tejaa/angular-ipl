import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isLoggedIn } from './state/match/match.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: any;
  token: string;
  title = 'client';
  constructor(private router: Router, private store: Store) {}
  ngOnInit(): void {}
}
