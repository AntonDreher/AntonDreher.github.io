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
  @Output() orderByLikes = new EventEmitter();
  @Output() getTopSellers = new EventEmitter();
  /**@constructor */
  constructor(public categoryListService: CategoryListService) {
    this.updateCategoryList();
  }

  /**@method */
  /**Fills the category list with the data from the backend,
   * and adds pseudo categories (Order by likes and top sellers)
   */
  private updateCategoryList() {
    this.categoryListService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categoryList = categories;
        this.categoryList.push(this.defaultCategory)
        this.categoryList.push(new Category(this.categoryList.length, 'Order by Likes'));
        this.categoryList.push(new Category(this.categoryList.length, 'Top sellers'));
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /**@method */
  /**@emits eventData */
  /**emits the selected category to the parent component */
  onCategorySelected(eventData: { category_id: number }) {
    if (eventData.category_id === this.categoryList.length - 2) {
      this.orderByLikes.emit();
    } else if (eventData.category_id === this.categoryList.length - 1) {
      this.getTopSellers.emit();
    }
    else {
      this.categorySelected.emit({ category_id: eventData.category_id });
    }
  }

  ngOnInit(): void {
  }

}
