import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  @Input() currentCategory: Category;
  @Output() categorySelected = new EventEmitter<{ category_id: number }>();
  constructor() {
    this.currentCategory = {
      category_id: -1,
      category_name: ''
    }
  }

  selectCategory(): void {
    this.categorySelected.emit({ category_id: this.currentCategory.category_id });
  }

  ngOnInit(): void {
  }

}
