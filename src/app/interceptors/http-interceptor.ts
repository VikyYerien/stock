import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    // Verificar si la URL no es 'https://qapi.vercel.app/api/random'
    if (req.url !== 'https://qapi.vercel.app/api/random') {
      const token = localStorage.getItem('jwtToken');
      
      // Si hay un token, agregarlo al header
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(cloned);
      }
     }

    // Si no hay token o la URL es la que quieres excluir, simplemente pasa la solicitud tal cual
    return next.handle(req);
  }
}
