import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: UserInfo;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_ENDPOINT = '/auth';

  constructor(private http: HttpService) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.AUTH_ENDPOINT}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.AUTH_ENDPOINT}/logout`, {});
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.AUTH_ENDPOINT}/refresh-token`, {});
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.AUTH_ENDPOINT}/me`);
  }
}
