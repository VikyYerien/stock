import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  // Obtener la lista de Category
  getCategories(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}-list/${id}`);
  }

  // Obtener un Category por ID
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo Category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/create`, category);
  }

  // Actualizar un Category
  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  // Eliminar un Category
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}