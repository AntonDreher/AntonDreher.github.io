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

  constructor(public authorizationService: AuthorizationService, private router: Router) { }

  login(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var user = idAttr.nodeValue;
    var pass = idAttr.nodeValue;
    let loginData: Login = new Login(user, pass);
    this.authorizationService.login(loginData).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/products']);
        console.log(1);
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
