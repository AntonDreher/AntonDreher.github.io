import { Component, OnInit } from '@angular/core';
import globalProductList from '../../assets/menu_Items.json'
import { Product } from '../model/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor() {
    this.productList = globalProductList;
    console.log(this.productList);
  }

  ngOnInit(): void {
  }

}
