import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Review } from "../model/review";
const baseUrl = 'http://localhost:3000';
@Injectable()
export class ReviewService {
    constructor(private http: HttpClient) { }

    public postReview(review: Review): Observable<string> {
        return this.http.post<string>(baseUrl + '/review', review);
    }
}

