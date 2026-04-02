import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_ENDPOINT = '/users';

  constructor(private http: HttpService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_ENDPOINT);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.USER_ENDPOINT}/${id}`);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.USER_ENDPOINT, user);
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.USER_ENDPOINT}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.USER_ENDPOINT}/${id}`);
  }
}
