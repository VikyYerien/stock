import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwtToken';
  private refreshTokenKey = 'jwtRefreshToken';

  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getTokenExp() {
    const token = localStorage.getItem(this.tokenKey);
    const exp = this.getExpiration(token);
    return exp;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  setRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, JSON.stringify(token));
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getRefreshTokenExp() {
    const token = localStorage.getItem(this.refreshTokenKey);
    const exp = this.getExpiration(token);
    return exp;
  }

  removeRefreshToken() {
    localStorage.removeItem(this.refreshTokenKey);
  }

  login(email: string, password: string, organization: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {
      email: email,
      passWord: password,
      organizationId: organization
    }, { withCredentials: true })
      .pipe(map(response => {                   
          // login successful if there's a jwt token in the response
          const token = response?.response?.token;
          const refreshToken = response?.response?.refresh;
          if (token && refreshToken) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.setToken(token);
              this.setRefreshToken(refreshToken);
          } else {
              throw new Error('No se recibió el token o refresh en la respuesta del backend');
          }
          return token;
      }),
      catchError(error => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }));
    }

    refresh() {
      const refresh = this.getRefreshToken();
      return this.http.post<any>(`${environment.apiUrl}/refresh`, {refreshToken: refresh})
        .pipe(map(response => {                   
            // login successful if there's a jwt token in the response
            const token = response?.response?.token;
            const refreshToken = response?.response?.refresh;
            if (token && refreshToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.setToken(token);
                this.setRefreshToken(refreshToken);
            } else {
                throw new Error('No se recibió el token o refresh en la respuesta del backend');
            }
            return token;
        }),
        catchError(error => {
          console.error('Error al iniciar sesión:', error);
          throw error;
        }));
      }

    logout() {
        // remove user from local storage to log user out
        this.removeToken();
        this.removeRefreshToken();
        this.router.navigate(['']);
    }

    getCurrentUser() {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken = Object(jwtDecode(token));
          return decodedToken.user
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
      }
      return null;
    }

    getExpiration(token: string | null) {
      if (token) {
        try {
          const decodedToken = Object(jwtDecode(token));
          console.log('decodedToken.exp', decodedToken.exp)
          return decodedToken.exp
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
      }
      return null;
    }

    getCurrentRole() {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken = Object(jwtDecode(token));
          return decodedToken.user.role
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
      }
      return null;
    }

    getCurrentOrganization() {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken = Object(jwtDecode(token));
          return decodedToken.user.organizationId
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
      }
      return null;
    }
}