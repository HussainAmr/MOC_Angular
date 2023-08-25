import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { LoginInterface } from './Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj: LoginInterface = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    this.authService.login(this.loginObj);
  }
}
