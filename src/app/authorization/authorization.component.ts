import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  username: string = 'table1';
  password: string = 'table1';

  constructor(public authorizationService: AuthorizationService, private router: Router) { }

  login() {
    let loginData: Login = new Login(this.username, this.password);
    this.authorizationService.login(loginData).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.token)
        this.router.navigate(['/products'])
      },
      (error) => {
        //TODO 
        console.log(error);
      }
    );
  }

  redirectToDefault() {
    this.router.navigate(['/products'])
  }

  ngOnInit(): void {
  }

}
