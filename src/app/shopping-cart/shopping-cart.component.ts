import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../model/product';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CartItem } from '../model/cartItem';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: CartItem[] = [];
  constructor(private cartService: CartService, private router: Router  ) { }

  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    //this.products = this.cartService.getItems();
    this.cartService.getItems().subscribe(products => this.products = products);
  }

  lowerAmount(prod: CartItem) :void {
    if(prod.amount>1) {
      this.cartService.updateAmount(prod.itemId, prod.amount-1);
    } else {
      this.cartService.removeItem(prod);
      this.getProducts();
    }
    
  }

  upAmount(prod: CartItem) :void {
    this.cartService.updateAmount(prod.itemId, prod.amount+1);
  }

  clearCart() {
    this.cartService.clearShoppingCart();
    this.getProducts();
  }

  getTotalPrice() :number {
    return this.cartService.calculateTotalPrice();
  }

  checkout() :void {
    this.router.navigateByUrl('/checkout');
  }

}
