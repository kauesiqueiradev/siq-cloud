import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public sectors = new Array<{ icon: string, name: string }>();
  pag : number = 1;
  count: number = 8;
  columns: number = 1;
  window: any;

  isSidebarExpanded: boolean = false;
  mainClass: string = 'main-expanded';

  constructor(private router: Router, private sidebarService: SidebarService) {
    // console.log('Carregando dados....');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isDetailsVisible = event.url.includes('/details');
      }
    });
  }

  ngOnInit() {
    this.checkScreenWidth();
    this.sidebarService.sidebarToggled$.subscribe(isExpanded => {
      this.isSidebarExpanded = isExpanded;
      console.log('Received sidebar state:', isExpanded);
      this.mainClass = isExpanded ? 'main-expanded' : 'main-collapsed';
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const tabletWidth = 768;
    const deskWidth = 1024;
    const mobileColumns = 2;
    const desktopMinColumns = 3;
    const desktopColumns = 4;

    if (screenWidth >= deskWidth) {
      this.columns = screenWidth >= tabletWidth ? desktopColumns : 1;
      this.count = this.columns === 4 ? 16 : 12;
    } else if (screenWidth >= tabletWidth) {
      this.columns = desktopMinColumns;
      this.count = 12;
    } else {
      this.columns = 4;
      this.count = 8;
    }

  }

  get columnsTemplate(): string {
    return `repeat(${this.columns}, 1fr)`;
  }
  isDetailsVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    console.log('trocou');
  }

  closeSidebar() {
    this.isSidebarExpanded = false;
  }
}
