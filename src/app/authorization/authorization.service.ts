import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../model/login";
import { Observable, Subscription } from "rxjs";
import jwt_decode from "jwt-decode";
import { decode } from "querystring";

const baseURL = 'http://localhost:3000';
@Injectable()
export class AuthorizationService {
    constructor(private http: HttpClient) {

    }
    /**@method */
    /**@param {Login} loginData */
    /**@returns {Observable<string>} */
    /**Sends the Login data to the backend (via HTTP-Post request)*/
    login(loginData: Login): Observable<string> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = {
            headers: httpHeaders
        }
        return this.http.post<string>(baseURL + '/login', JSON.stringify(loginData), options);
    }
    /**@method */
    /**@return {string}  */
    /**returns the jwt access-token, if already one was created, if not an empty string is returned */
    getToken() {
        let token: string;
        if (localStorage.getItem('access_token') === null) {
            token = '';
        } else {
            token = localStorage.getItem('access_token')!;
        }
        return token;
    }

    /**@method */
    /**@return {boolean} */
    /**checks if a user has a valid session, if the session is expired, the token is removed from the browsers*/
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
    /**@method */
    /**returns the stored jwt as decoded string */
    public getDecodedAccessToken(): any {
        try {
            return jwt_decode(this.getToken());
        } catch (error) {
            return null;
        }
    }
}