import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class LoginComponent implements OnInit {
  private loginCred = {
    username: '',
    password: '',
  };

  readonly isLoggingIn = signal(false);
  public errorMessage = signal('');

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.errorMessage.set('');
    this.isLoggingIn.set(true);

    this.loginCred.username = form.value.username;
    this.loginCred.password = form.value.password;

    this.loginService.login(this.loginCred.username, this.loginCred.password).subscribe({next: response => {
      this.isLoggingIn.set(false);
      if(response.token)
        this.router.navigate(['']);
    },
    error: (error: HttpErrorResponse) => {
      this.isLoggingIn.set(false);
      
      if (error.status === 401) {
        this.errorMessage.set('Incorrect username or password.');
      }
      else if (error.status === 0) {
        this.errorMessage.set('Server unavailable. Please try again later.');
      }
      else {
        this.errorMessage.set('Something went wrong. Please try again.');
      }
    }});
  }
}
