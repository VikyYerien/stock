import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tokenExp = authService.getTokenExp();
  const refreshTokenExp = authService.getRefreshTokenExp();
  const tokenExpired =  tokenExp < new Date().getTime()
  const refreshTokenExpired = refreshTokenExp < new Date().getTime() 
  let isLoggedIn = authService.isLoggedIn();
  const isLoginRoute = state.url === '/';

  if (tokenExpired && refreshTokenExpired) {
    if(isLoggedIn) authService.logout();
  } else if( tokenExpired && !refreshTokenExpired) {
    authService.refresh()
    isLoggedIn = authService.isLoggedIn();
  }

  // Si el usuario no está logueado e intenta acceder a cualquier ruta que no sea login, redirigir al login
  if (!isLoggedIn && !isLoginRoute) {
    router.navigate(['/']);
    return false;
  }

  // Si el usuario está logueado y está intentando ir a la pantalla de login, redirigir al home
  if (isLoggedIn && isLoginRoute) {
    router.navigate(['/home']);
    return false;
  }

  // Permitir la navegación
  return true;
};