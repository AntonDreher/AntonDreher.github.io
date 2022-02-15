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
  /**@constructor */
  constructor(public authorizationService: AuthorizationService, private router: Router) { }

  /**@method */
  /**@param {any} events */
  /**Logs a user in, event is triggered by clicking on one of the 4 QR-Codes, displayed in the opening 
   * screen. A Request to the backend is then sent, with the user and password assigned to the QR-Code.
   * If successful, we get back a JWT, which will expire in 1 hour, and gives us access to the actual page.
   */
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**@method */
  /**Redirects to the menu. Is called when authorization already happenedss */
  redirectToDefault() {
    this.router.navigate(['/products'])
  }

  ngOnInit(): void {
  }

}
