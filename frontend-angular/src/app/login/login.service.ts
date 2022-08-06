import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { BehaviorSubject, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { decodeToken, isTokenValid } from '../util/token';

interface LoginResponse {
  token: string;
}

interface User {
  username: string | number;
  authorities: string | number;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  public loggedInUser = new BehaviorSubject<User>({
    username: '',
    authorities: '',
  });
  private decodedToken: { [prop: string]: string | number } = {};

  constructor(private httpClient: HttpClient) {
    if (
      localStorage.getItem('token') !== null &&
      isTokenValid(localStorage.getItem('token')!)
    ) {
      this.decodedToken = decodeToken(localStorage.getItem('token')!);

      const user: User = {
        username: this.decodedToken['username'],
        authorities: this.decodedToken['authorities'],
      };
      this.loggedInUser.next(user);
    }
  }

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
          this.decodedToken = decodeToken(response.token);
          const user: User = {
            username: this.decodedToken['username'],
            authorities: this.decodedToken['authorities'],
          };
          this.loggedInUser.next(user);
        })
      );
  }
}
