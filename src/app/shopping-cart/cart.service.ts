import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { CartItem } from '../model/cartItem';
import { Observable, of } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from '../authorization/authorization.service';
import { OrderData } from '../model/orderData';
import { OrderItemsData } from '../model/orderItemsData';
const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[];

  constructor(private http: HttpClient, private authorization: AuthorizationService) {
    this.cartItems = [];
  }

  public getItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  public getItemsForOrder(): CartItem[] {
    return this.cartItems;
  }

  public addItem(product: Product, imageURL: SafeUrl) {
    let toAdd = new CartItem();
    toAdd.itemId = product.product_id;
    toAdd.price = product.price;
    toAdd.title = product.title;
    toAdd.imageUrl = imageURL;
    toAdd.amount = 1;
    if (this.getIDs().includes(toAdd.itemId)) {
      this.cartItems.forEach(function (cartItem) {
        if (cartItem.itemId === toAdd.itemId) {
          cartItem.amount += toAdd.amount;
        }
      })
    } else {
      this.cartItems.push(toAdd);
    }
  }

  public updateAmount(id: number, newAmount: number) {
    this.cartItems.forEach(function (cartItem) {
      if (cartItem.itemId === id) {
        cartItem.amount = newAmount;
      }
    })
  }

  public removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(function (obj) {
      return obj.itemId !== item.itemId;
    })
  }

  public clearShoppingCart() {
    this.cartItems = [];
  }

  public calculateTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(function (cartItem) {
      totalPrice += cartItem.price * cartItem.amount;
    })
    return totalPrice;
  }

  private getIDs() {
    let ids: number[] = [];
    this.cartItems.forEach(function (cartItem) {
      ids.push(cartItem.itemId);
    })

    return ids;
  }

  public pay(cardNr: number, cardSecret: number): Observable<string> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    }
    return this.http.post<string>(baseUrl + '/payment', '{"cardNr": "' + cardNr + '", "cardSecret": "' + cardSecret + '"}', options);
  }

  public order(orderData: OrderData): Observable<string> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    }


    return this.http.post<string>(baseUrl + '/order', orderData, options);


  }

  public getOidByToken(token: string): Observable<string> {
    let httpHeaders = new HttpHeaders({
      'Authorization': this.authorization.getToken(),
    });
    console.log("in get oid" + token);
    return this.http.get<string>(baseUrl + '/getOrderIdbyToken/' + token);
  }

  public insertInOrderedProducts(id: number): Observable<string> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    }

    let data = new OrderItemsData(id, this.cartItems);




    return this.http.post<string>(baseUrl + '/testPost', data, options);
  }



}
