import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isLoggedIn() {
    let isAuthenticated = false;
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }

    return isAuthenticated;
  }
}
