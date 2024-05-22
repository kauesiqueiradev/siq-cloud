import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/email';
  // private apiUrl = 'http://siq.grupotecnotextil.com:3000/email';

  
  constructor(private http: HttpClient) { }

  sendEmail(subject: string, message: string): Observable<Blob> {
    const emailData = { subject, message };

    return this.http.post(`${this.apiUrl}/email-send`, emailData, { responseType: 'blob' })
  }
}
