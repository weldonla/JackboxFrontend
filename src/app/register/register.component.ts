import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';
import { RegisterUser, User } from '../models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  async onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const userToRegister: RegisterUser = new RegisterUser({
      firstName: this.f['firstname'].value,
      lastName: this.f['lastname'].value,
      userName: this.f['username'].value,
      password: this.f['password'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
    })
    this.userService.register(userToRegister).subscribe(
      {
        next: (user: User) => {
          this.alertService.success(`You've successfully registered a new user: ${user.firstName} ${user.lastName}`)
        },
        error: (e) => {
          this.alertService.error(e.error.message);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }
}