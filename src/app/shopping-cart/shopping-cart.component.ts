import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cartItem';
import { Router } from '@angular/router';
import { CartService } from './cart.service';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private cartService: CartService, private router: Router) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.cartService.getItems().subscribe(cartItems => this.cartItems = cartItems);
  }

  lowerAmount(prod: CartItem): void {
    if (prod.amount > 1) {
      this.cartService.updateAmount(prod.itemId, prod.amount - 1);
    } else {
      this.cartService.removeItem(prod);
      this.getProducts();
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.getProducts();
  }

  upAmount(prod: CartItem): void {
    this.cartService.updateAmount(prod.itemId, prod.amount + 1);
  }

  clearCart() {
    this.cartService.clearShoppingCart();
    this.getProducts();
  }

  getTotalPrice(): string {
    return this.cartService.calculateTotalPrice().toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  }

  checkout(): void {
    this.router.navigateByUrl('/checkout');
  }

  getDistinctValues(): number {
    return this.cartItems.length;
  }

  getPriceAsCurrency(item: CartItem): string {
    let fullPrice: number = item.price * item.amount;
    return fullPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  }

}
