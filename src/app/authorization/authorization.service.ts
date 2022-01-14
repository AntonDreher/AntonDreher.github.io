import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../model/login";
import { Observable, Subscription } from "rxjs";

const baseURL = 'http://localhost:3000';
@Injectable()
export class AuthorizationService {
    constructor(private http: HttpClient) {

    }

    login(loginData: Login): Observable<string> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = {
            headers: httpHeaders
        }
        return this.http.post<string>(baseURL + '/login', JSON.stringify(loginData), options);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
    }
}