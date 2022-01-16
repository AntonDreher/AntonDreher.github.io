import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  @Input() currentCategory: Category;
  constructor() {
    this.currentCategory = {
      category_id: -1,
      category_name: ''
    }
  }

  ngOnInit(): void {
  }

}
