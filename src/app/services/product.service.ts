import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {}

  // Obtener la lista de productos
  getProducts(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}-list/${id}`);
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/create`, product);
  }

  // Actualizar un producto
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
