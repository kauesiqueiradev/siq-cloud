import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent {
  currentUser: any;

  constructor(private sidebarSerbive: SidebarService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      this.currentUser = parsedUser.nome;
    } else {
      // Tratar o caso em que 'currentUser' não está presente no armazenamento local
    }
  }

  @Input() isSidebarExpanded: boolean = true;

  @Output() optionClicked: EventEmitter<void> = new EventEmitter<void>();

  // isSidebarExpanded: boolean = false;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    // console.log('Trocou aside');
    this.sidebarSerbive.toggleSidebar(this.isSidebarExpanded);
  }

  handleClick() {
    this.optionClicked.emit();
  }
}
