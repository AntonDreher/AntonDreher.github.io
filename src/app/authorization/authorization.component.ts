import { Component, NgModule, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthorizationService } from './authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  username: string = 'table1';
  password: string = 'table1';

  login() {
    let loginData: Login = new Login(this.username, this.password);
    this.authorizationService.login(loginData).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.token)
      },
      (error) => {
        //TODO 
        console.log(error);
      }
    );
  }
  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

}
