import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isAsideOpen:boolean = false;

  toggleAside() {
    this.isAsideOpen = !this.isAsideOpen;
  }
}
