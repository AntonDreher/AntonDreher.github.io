import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  currentReview: Review;
  constructor() {
    this.currentReview = new Review();
  }

  ngOnInit(): void {
  }

  sendReview() {
    console.log(this.currentReview);
  }
}
