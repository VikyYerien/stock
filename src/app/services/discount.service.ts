import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discount } from '../models/Discount';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  private apiUrl = `${environment.apiUrl}/discount`;

  constructor(private http: HttpClient) {}

  // Obtener la lista de Discount
  getDiscounts(id: string): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}-list/${id}`);
  }

  // Obtener un Discount por ID
  getDiscountById(id: string): Observable<Discount> {
    return this.http.get<Discount>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo Discount
  createDiscount(discount: Discount): Observable<Discount> {
    return this.http.post<Discount>(`${this.apiUrl}/create`, discount);
  }

  // Actualizar un Discount
  updateDiscount(id: string, discount: Discount): Observable<Discount> {
    return this.http.put<Discount>(`${this.apiUrl}/${id}`, discount);
  }

  // Eliminar un Discount
  deleteDiscount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}