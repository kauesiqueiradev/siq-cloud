import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../../interface/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCardService {

  cardsUrl = '/assets/test.json';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Card> {
    return this.http.get<Card>(this.cardsUrl);
  }
}
