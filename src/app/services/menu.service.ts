import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private key = 'selectedMenu'; 

  constructor() {}

  // Guarda un string en localStorage
  saveString(value: string): void {
    localStorage.setItem(this.key, value);
  }

  // Obtiene el string desde localStorage
  getString(): string | null {
    return localStorage.getItem(this.key);
  }

  // Elimina el string del localStorage
  clearString(): void {
    localStorage.removeItem(this.key);
  }
}
