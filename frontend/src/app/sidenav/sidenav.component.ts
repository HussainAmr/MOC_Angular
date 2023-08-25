import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { INavBarData } from './helper';
import { navBarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Output() onTogglesideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  constructor(private authService: AuthService) {}

  screenWidth = 0;
  collapsed = false;
  navData = navBarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onTogglesideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse() {
    const page = document.getElementsByClassName('page-wrapper')[0];
    if (this.collapsed) {
      page.classList.remove('page-responsive');
    } else {
      page.classList.add('page-responsive');
    }
    this.collapsed = !this.collapsed;
    this.onTogglesideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  // closeSideNav() {
  //   this.collapsed = false;
  //   this.onTogglesideNav.emit({
  //     collapsed: this.collapsed,
  //     screenWidth: this.screenWidth,
  //   });
  // }

  logout() {
    this.authService.logUserOut();
  }
}
