import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth/login-auth.service';
import { Observable, lastValueFrom, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private loginAuthService: LoginAuthService, private router: Router) {}

  async canActivate(route: any, state: any): Promise<boolean> {
    try {
      const authenticated = await lastValueFrom(this.loginAuthService.isAuthenticated$)

      if (!authenticated) {
        const cpfOrMat = localStorage.getItem('currentUser')
        if (cpfOrMat) {
          const refresh = await lastValueFrom(this.loginAuthService.login(cpfOrMat))

          if (!refresh) {
            this.router.navigate([`/`], { queryParams: { returnUrl: state.url } })
            return false
          }
          
          return !!refresh;
        }
        this.router.navigate(['/']);
        return false;
      }
      return authenticated;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = async (route, state) => {
  return await inject(AuthGuard).canActivate(route, state)
}

  // canActivate(): Observable<boolean> {
  //   const cpfOrMat = ''; // Fornecer o valor do CPF ou Matrícula aqui, ou de onde você o obtém

  //   console.log('Valor do cpfOrMat', cpfOrMat)
  //   // console.log("login:",this.loginAuthService);
  //   return this.loginAuthService.login(cpfOrMat).pipe(
  //     tap(user => console.log('Retorno: ', user)),
  //     map(user => {
  //       if (user) {
  //         return true; // Usuário autenticado, permitir acesso
  //       } else {
  //         this.router.navigate(['/login']); // Redirecionar para a página de login se o usuário não estiver autenticado
  //         return false;
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Erro ao realizar login:', error);
  //       this.router.navigate(['/login']); // Redirecionar para a página de login em caso de erro
  //       return of(false);
  //     })
  //   );
  // }
