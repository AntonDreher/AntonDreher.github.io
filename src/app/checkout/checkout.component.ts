import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../shopping-cart/cart.service';
import { CartItem } from '../model/cartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: CartItem[] = [];
  constructor(
    private route: ActivatedRoute,
    private Location: Location,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  /**@method */
  /**adds all items that are in the cart to the CartItem Array */
  getProducts(): void {
    this.cartService.getItems().subscribe(products => this.products = products);
  }
  /**@method */
  /**@returns {number} totalPrice*/
  /**calls the cartservice method for calculating the total price */
  getTotalPrice(): number {
    return this.cartService.calculateTotalPrice();
  }

  pay(): void {

  }


  goBack(): void {
    this.Location.back();
  }

}
