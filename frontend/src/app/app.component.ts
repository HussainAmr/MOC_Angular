import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'moc';

  constructor(private authService: AuthService, public router: Router) {}

  isSideNavCollapsed = false;
  screenWidth = 0;

  onTogglesideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  onLoginRoute() {
    return this.router.url === '/login';
  }
}
