import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";
import { Category } from "../model/category";

const baseUrl = 'http://localhost:3000';
@Injectable()
export class CategoryListService {
    constructor(private http: HttpClient, private authorization: AuthorizationService) { }

    /**@method */
    /**@returns {Observable<Category[]} */
    /**Makes a get request, to get all categories */
    getCategories(): Observable<Category[]> {
        let httpHeaders = new HttpHeaders({
            'Authorization': this.authorization.getToken(),
        });
        return this.http.get<Category[]>(baseUrl + '/categories');
    }
}