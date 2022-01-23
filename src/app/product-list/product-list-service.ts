import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";
import { Product } from "../model/product";

const baseUrl = 'http://localhost:3000';
@Injectable()
export class ProductListService {
    constructor(private http: HttpClient, private authorization: AuthorizationService) { }

    getProductList(): Observable<Product[]> {
        return this.http.get<Product[]>(baseUrl + '/products');
    }

    getProductListByCategory(category_id: number) {
        return this.http.get<Product[]>(baseUrl + '/products/bycategory/' + category_id);
    }

    getProductListOrderedByLikes(): Observable<Product[]> {
        return this.http.get<Product[]>(baseUrl + '/products/orderbylikes');
    }

    getProductListOrderdBySells(): Observable<Product[]> {
        return this.http.get<Product[]>(baseUrl + '/products/gettopproducts');
    }
}