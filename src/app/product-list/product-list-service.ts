import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";
import { Product } from "../model/product";

const baseUrl = 'http://localhost:3000';
@Injectable()
export class ProductListService {
    constructor(private http: HttpClient, private authorization: AuthorizationService) { }

    getProductList(): Observable<Product[]> {
        let httpHeaders = new HttpHeaders({
            'Authorization': this.authorization.getToken(),
        });
        return this.http.get<Product[]>(baseUrl + '/products');
    }
}