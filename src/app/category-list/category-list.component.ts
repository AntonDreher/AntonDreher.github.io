import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../model/category';
import { CategoryListService } from './category-list-service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = [];
  defaultCategory: Category = new Category(0, 'All');
  @Output() categorySelected = new EventEmitter<{ category_id: number }>();
  constructor(public categoryListService: CategoryListService) {
    this.updateCategoryList();
  }

  private updateCategoryList() {
    this.categoryListService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categoryList = categories;
        this.categoryList.push(this.defaultCategory)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onCategorySelected(eventData: { category_id: number }) {
    this.categorySelected.emit({ category_id: eventData.category_id });
  }

  ngOnInit(): void {
  }

}
