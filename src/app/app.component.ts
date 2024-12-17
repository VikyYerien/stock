import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'stock-frontend';

  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private router: Router // Inyecta el servicio Router
  ) {}

  ngOnInit(): void {
    // Escucha los cambios en la navegación
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Refinar el tipo con TypeScript
      )
      .subscribe((event: NavigationEnd) => {
        const menuString = this.getMenuStringFromRoute(event.url); // Obtén el string según la ruta
        this.setMenu(menuString); // Guarda el string en el menú
      });

    //if (!this.getMenu()) this.setMenu('Inicio');
  }

  logout() {
    this.authService.logout();
  }

  isLogguedIn() {
    return this.authService.isLoggedIn();
  }

  getMenu() {
    return this.menuService.getString();
  }

  setMenu(str: string) {
    this.menuService.saveString(str);
  }

  /**
   * Devuelve un string basado en la ruta actual
   */
  private getMenuStringFromRoute(url: string): string {
    if (url.startsWith('/users')) return 'Usuarios';
    if (url.startsWith('/user')) return 'Usuarios';
    if (url.startsWith('/products')) return 'Productos';
    if (url.startsWith('/product')) return 'Productos';
    if (url.startsWith('/cathegories')) return 'Categorias';
    if (url.startsWith('/discounts')) return 'Descuentos';
    if (url.startsWith('/discount')) return 'Descuentos';
    if (url.startsWith('/purchases')) return 'Pedidos';
    if (url.startsWith('/register')) return 'Caja';
    return 'Inicio'; // Valor por defecto
  }
}
