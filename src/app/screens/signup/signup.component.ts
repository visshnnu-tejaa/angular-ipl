import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { registerUserRequest } from 'src/app/state/match/match.actions';
import { getError } from 'src/app/state/match/match.selectors';
import { passwordValidator } from 'src/app/validators/passwordValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(getError).subscribe((err) => (this.error = err));
  }

  get form() {
    return this.signUpForm.controls;
  }

  signUpForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validator: passwordValidator }
  );

  signUpUser(form: any) {
    console.log(form);
    let user = {
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
    };
    this.store.dispatch(registerUserRequest(user));
    // this.userService.registerUser(form).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.toastr.success('SignIn Successful');
    //     this.router.navigate(['/login']);
    //   },
    //   (err) => {
    //     this.error = err.error.message;
    //     console.log(err);
    //     this.toastr.error(this.error);
    //   }
    // );
  }
}
