import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private loginCred = {
    username: '',
    password: '',
  };

  public isLoggingIn = false;
  public isError = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isError = false;
    this.isLoggingIn = true;

    this.loginCred.username = form.value.username;
    this.loginCred.password = form.value.password;

    this.loginService.login(this.loginCred.username, this.loginCred.password).subscribe({next: response => {
      this.isLoggingIn = false;
      if(response.token)
        this.router.navigate(['']);
    },
    error: error => {
      this.isLoggingIn = false;
      if(error)
        this.isError = true;
    }});
  }
}
