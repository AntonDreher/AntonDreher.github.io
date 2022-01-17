import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../model/login";
import { Observable, Subscription } from "rxjs";
import jwt_decode from "jwt-decode";

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
        let token: string;
        if (localStorage.getItem('access_token') === null) {
            token = '';
        } else {
            token = localStorage.getItem('access_token')!;
        }
        return token;
    }

    get isLoggedIn(): boolean {
        const decodedToken = this.getDecodedAccessToken();
        if (decodedToken === null) {
            return false;
        } else {
            if (Date.now() >= decodedToken.exp * 1000) {
                localStorage.removeItem('access_token');
                return false;
            } else {
                return true;
            }
        }
    }

    private getDecodedAccessToken(): any {
        try {
            return jwt_decode(this.getToken());
        } catch (error) {
            return null;
        }
    }
}