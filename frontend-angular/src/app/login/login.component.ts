import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

    this.httpClient.post("https://spring/login", null, {
      headers: {
        "Authorization": "Basic"
      }
    }).subscribe(response => {
      console.log(response);
    });
  }
}
