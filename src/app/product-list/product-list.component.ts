import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductListService } from './product-list-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor(public productListService: ProductListService) {
    this.updateProductList();
  }

  /**@method */
  /**gets the latest product list from the backend */
  private updateProductList() {
    this.productListService.getProductList().subscribe(
      (productList: Product[]) => {
        this.productList = productList;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  /**@method */
  /** when a category is changed, the productlist also has to be updated */
  onCategorySelected(eventData: { category_id: number }) {
    if (eventData.category_id === 0) {
      this.updateProductList();
    } else {
      this.productListService.getProductListByCategory(eventData.category_id).subscribe(
        (productList: Product[]) => {
          this.productList = productList;
        },
        (error) => {
          console.log(error.stack);
        }
      )
    }
  }
  /**@method */
  /** ges the product list sorted by likes */
  onOrderByLikes() {
    this.productListService.getProductListOrderedByLikes().subscribe(
      (productList: Product[]) => {
        this.productList = productList;
      },
      (error) => {
        console.log(error.stack);
      }
    );
  }
  /**@method */
  /** ges the product list sorted by sales */
  onGetTopSellers() {
    this.productListService.getProductListOrderdBySells().subscribe(
      (productList: Product[]) => {
        this.productList = productList;
      },
      (error) => {
        console.log(error.stack);
      }
    )
  }
  ngOnInit(): void {
  }

}
