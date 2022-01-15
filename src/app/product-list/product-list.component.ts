import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
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

  ngOnInit(): void {
  }

}
