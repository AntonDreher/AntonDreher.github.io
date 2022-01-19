import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";

const baseUrl = 'http://localhost:3000';
@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private authorization: AuthorizationService) { }

    getImageFromProduct(id: number): Observable<Blob> {
        let httpHeaders = new HttpHeaders({
            'Authorization': this.authorization.getToken(),
        });
        return this.http.get<Blob>(baseUrl + '/product/image/' + id, { headers: httpHeaders, responseType: 'blob' as 'json' });
    }
}