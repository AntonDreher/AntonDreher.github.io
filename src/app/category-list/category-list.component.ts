import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
  }

}
