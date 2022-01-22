import { Component, NgZone, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization/authorization.service';
import { CartItem } from './model/cartItem';
import { CartService } from './shopping-cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GuestView';
  numberOfItemsInCart: number = 0;
  constructor(public authorizationService: AuthorizationService, public cartService: CartService) {
    this.getNumberOfItemsInCart();
  }


  getNumberOfItemsInCart() {
    this.cartService.getItems().subscribe(
      (items: CartItem[]) => {
        console.log(items);
      }
    );
  }
}
