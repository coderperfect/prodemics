import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginCred = {
    username: "",
    password: ""
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loginCred.username = form.value.username;
    this.loginCred.password = form.value.password;

    this.httpClient.get<LoginResponse>(`${environment.HOST_URL}/login`, {
      headers: {
        "Authorization": "Basic " + Buffer.from(`${this.loginCred.username}:${this.loginCred.password}`, 'utf-8').toString('base64')
      }
    }).subscribe(response => {
      localStorage.setItem("token", response.token)
    });
  }
}
