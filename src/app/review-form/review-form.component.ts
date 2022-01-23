import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../model/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  currentReview: Review;
  constructor(private reviewService: ReviewService, private router: Router) {
    this.currentReview = new Review();
  }

  ngOnInit(): void {
  }

  sendReview() {
    this.reviewService.postReview(this.currentReview).subscribe(
      (response: string) => {
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
