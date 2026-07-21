import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { decodeToken, isTokenValid } from '../util/token';

interface LoginResponse {
  accessToken: string;
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
        username: this.decodedToken['sub'],
        authorities: this.decodedToken['scope'],
      };
      this.loggedInUser.next(user);
    }
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${environment.HOST_URL}/api/auth/login`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.accessToken);
          this.decodedToken = decodeToken(response.accessToken);
          const user: User = {
            username: this.decodedToken['sub'],
            authorities: this.decodedToken['scope'],
          };
          this.loggedInUser.next(user);
        })
      );
  }
}
