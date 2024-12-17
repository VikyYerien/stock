import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Obtener la lista de usuarios
  getUsers(id:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}-list/${id}`);
  }

  // Obtener un usuario por ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }

  // Actualizar un usuario
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
