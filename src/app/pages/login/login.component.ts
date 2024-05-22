import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginAuthService } from 'src/app/services/login-auth/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  cpfOrMat: string = '';
  cpfOrMatInvalid: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: LoginAuthService, private router: Router) {}

  login() {
    if (this.cpfOrMat.length === 0) {
      this.cpfOrMatInvalid = true; 
      return; 
  }

    this.isLoading = true; 

    this.authService.login(this.cpfOrMat).subscribe(
      user => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/home']);
            this.cpfOrMat = '';
        } else {
          // console.error('CPF ou Matricula não encontrado.');
          alert("CPF ou Matricula não encontrados");
        }
      },
      (error) => {
        console.error('Erro ao realizar login:', error);
        // console.log('Erro 1er')
      }
    ).add(() => {
        this.isLoading = false; 
    });
    this.cpfOrMat = '';

  }

}
