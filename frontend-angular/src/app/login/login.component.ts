import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loginCred.username = form.value.username;
    this.loginCred.password = form.value.password;

    this.loginService.login(this.loginCred.username, this.loginCred.password);
  }
}
