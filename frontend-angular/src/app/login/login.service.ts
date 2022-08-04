import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { BehaviorSubject, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
}

interface User {
  username: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  public loggedInUser = new BehaviorSubject<User>({ username: '' });

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .get<LoginResponse>(`${environment.HOST_URL}/login`, {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${username}:${password}`, 'utf-8').toString('base64'),
        },
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          const user: User = { username: username };
          this.loggedInUser.next(user);
        })
      );
  }
}
