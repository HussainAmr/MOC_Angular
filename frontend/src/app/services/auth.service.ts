import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginInterface } from '../login/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDetails: [] = [];

  constructor(private router: Router) {}

  login(loginObj: LoginInterface) {
    if (
      loginObj.email === 'hussyamr@gmail.com' &&
      loginObj.password === '123'
    ) {
      sessionStorage.setItem('isLoggedIn', 'true');

      sessionStorage.setItem('token', loginObj.email);

      alert('User LogedIn!');
      this.router.navigate(['']);
    } else {
      alert('Enter Valid Input Credentials');
    }
  }

  logUserOut() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('token');

    alert('User Loged Out!!');

    this.router.navigate(['/login']);
  }
}
