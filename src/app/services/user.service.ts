import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../state/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInUser: any;
  token: string;
  constructor(private http: HttpClient) {}

  checkUser() {
    this.loggedInUser = localStorage.getItem('user');
    if (this.loggedInUser) {
      this.loggedInUser = JSON.parse(this.loggedInUser);
      this.token = this.loggedInUser.token;
    }
    console.log(this.token);
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  registerUser(user: any) {
    console.log('user:::', user);
    let url = 'http://localhost:8000/api/users/register';
    return this.http.post(url, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  loginUser(user: any) {
    let url = 'http://localhost:8000/api/users/login';
    return this.http.post(url, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(`user`);
  }
}
