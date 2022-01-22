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
  ngOnInit(): void {
  }

}
