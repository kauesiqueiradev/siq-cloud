import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  
  private sidebarToggledSource = new Subject<boolean>();
  sidebarToggled$ = this.sidebarToggledSource.asObservable();

  toggleSidebar(isExpanded: boolean) {
    this.sidebarToggledSource.next(isExpanded);
  }
}
