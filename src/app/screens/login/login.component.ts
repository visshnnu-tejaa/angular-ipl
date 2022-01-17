import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { loginUserRequest } from 'src/app/state/match/match.actions';
import { getError } from 'src/app/state/match/match.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.select(getError).subscribe((err) => (this.error = err));
  }

  get form() {
    return this.loginForm.controls;
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginUser(form: any) {
    let email = form.value.email;
    let password = form.value.password;
    let user = { email, password };
    this.store.dispatch(loginUserRequest(user));
    // this.userService.loginUser(form).subscribe(
    //   (data) => {
    //     localStorage.setItem('user', JSON.stringify(data));
    //     this.toastr.success('Login Successful');
    //     this.router.navigate(['/home']);
    //   },
    //   (err) => {
    //     this.error = err.error.message;
    //     console.log(err);
    //   }
    // );
  }
}
