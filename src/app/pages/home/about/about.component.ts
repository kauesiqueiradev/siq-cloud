import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  subject: string ='';
  message: string = '';

  constructor(private emailSevice: EmailService, private snackBar: MatSnackBar) {}

  sendEmail(): void {
    this.emailSevice.sendEmail(this.subject, this.message)
      .subscribe(
        response => {
          console.log('Email enviado com sucesso!', response);
          this.showSnackBar('E-mail enviado com sucesso!');
          this.clearFields();
          this.subject ='';
          this.message = '';
        },
        error => {
          console.error('Erro ao enviar o email: ', error);
        }
      );
      this.subject ='';
      this.message = '';
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
    });
  }

  clearFields(): void {
    this.subject = '';
    this.message = '';
  }
    
}

