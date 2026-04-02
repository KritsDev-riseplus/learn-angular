import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "user_info";

  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userInfo = localStorage.getItem(this.USER_KEY);

    if (token && userInfo) {
      this.currentUserSubject.next(JSON.parse(userInfo));
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${this.API_URL}/api/auth/login`;
    console.log("🔐 Attempting login with:", credentials);
    console.log("📡 API URL:", url);

    return this.http.post<LoginResponse>(url, credentials).pipe(
      tap((response) => {
        console.log("✅ Login successful:", response);
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response));
        this.currentUserSubject.next(response);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUsername(): string | null {
    const userInfo = localStorage.getItem(this.USER_KEY);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.username;
    }
    return null;
  }

  getRole(): string | null {
    const userInfo = localStorage.getItem(this.USER_KEY);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.role;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === "ADMIN";
  }
}
