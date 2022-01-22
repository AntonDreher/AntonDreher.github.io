import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";

const baseUrl = 'http://localhost:3000';
@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private authorization: AuthorizationService) { }

    getImageFromProduct(id: number): Observable<Blob> {
        return this.http.get<Blob>(baseUrl + '/product/image/' + id, { responseType: 'blob' as 'json' });
    }

    getAllergenesFromProduct(id: number): Observable<any> {
        return this.http.get(baseUrl + '/product/' + id + '/allergenes', { responseType: 'json' });
    }

    putLikeToProduct(product_id: number) {
        return this.http.put<string>(baseUrl + '/product/' + product_id + '/like', '', { responseType: 'text' as 'json' });
    }

    removeLikeFromProduct(product_id: number): Observable<string> {
        return this.http.put<string>(baseUrl + '/product/' + product_id + '/removelike', '', { responseType: 'text' as 'json' });
    }
    getNumberOfLikesFromProduct(product_id: number): Observable<any> {
        return this.http.get<any>(baseUrl + '/product/' + product_id + '/numberoflikes', { responseType: 'json' });
    }

    getProductWasLikedFromSession(product_id: number): Observable<boolean> {
        return this.http.get<boolean>(baseUrl + '/product/' + product_id + '/wasliked');
    }

    removeDislikeFromProduct(product_id: number): Observable<string> {
        return this.http.put<string>(baseUrl + '/product/' + product_id + '/removedislike', '', { responseType: 'text' as 'json' });
    }
    getNumberOfDislikesFromProduct(product_id: number): Observable<any> {
        return this.http.get<any>(baseUrl + '/product/' + product_id + '/numberofdislikes', { responseType: 'json' });
    }

    getProductWasDislikedFromSession(product_id: number): Observable<boolean> {
        return this.http.get<boolean>(baseUrl + '/product/' + product_id + '/wasdisliked');
    }

    putDislikeToProduct(product_id: number) {
        return this.http.put<string>(baseUrl + '/product/' + product_id + '/dislike', '', { responseType: 'text' as 'json' });
    }
}