import { Injectable } from '@angular/core';
import { Product } from './model/product';
import { CartItem } from './model/cartItem';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[];
 
  constructor() {
    this.cartItems = [];
  }

  public getItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  public addItem(product: Product) {
    let toAdd = new CartItem();
    toAdd.itemId = product.itemId;
    toAdd.price = product.price;
    toAdd.title = product.title;
    toAdd.amount = 1;
    console.log("yo");
    if(this.getIDs().includes(toAdd.itemId)) {
      this.cartItems.forEach(function(cartItem) {
        if (cartItem.itemId == toAdd.itemId) {
          cartItem.amount += toAdd.amount;
          console.log(cartItem.amount)
        }
      })
    } else {
      this.cartItems.push(toAdd);
      console.log(toAdd.amount);
    }

    
    console.log(this.cartItems.length);
  }

  public updateAmount(id: number, newAmount :number) {
    this.cartItems.forEach(function(cartItem) {
      if (cartItem.itemId == id) {
        cartItem.amount = newAmount;
      }
    })
  }

  public removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(function(obj) {
      return obj.itemId !== item.itemId;
    })
  }

  public clearShoppingCart() {
    this.cartItems = [];
  }

  public calculateTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(function(cartItem) {
      totalPrice += cartItem.price*cartItem.amount;
    })
    return totalPrice;
  }

  private getIDs() {
    let ids: number[] = [];
    this.cartItems.forEach(function(cartItem) {
      ids.push(cartItem.itemId);
    })

    return ids;
  }

}
