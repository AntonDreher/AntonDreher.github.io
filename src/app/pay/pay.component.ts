import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { CartService } from '../shopping-cart/cart.service';
import { Router } from '@angular/router';
import { OrderData } from '../model/orderData';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private http: HttpClient, private authorization: AuthorizationService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    //order in db
    this.cartService.pay(123456, 123).subscribe(
      (response: any) => {
        console.log(this.authorization.getDecodedAccessToken().name);
        let orderData = new OrderData(response.token, this.authorization.getDecodedAccessToken().name, this.cartService.calculateTotalPrice(), this.cartService.getItemsForOrder());
        this.cartService.order(orderData).subscribe(
          (response: any) => {
            this.cartService.getOidByToken(orderData.token).subscribe(
              (response: any) => {
                let data = JSON.parse(JSON.stringify(response[0]));
                console.log("OID: " + data.oid);
                this.cartService.insertInOrderedProducts(data.oid).subscribe(
                  (response: any) => {
                    console.log("fertig mit order");
                    this.cartService.clearShoppingCart();
                  },
                  (error: any) => {
                    console.log(error);
                  }
                );
              },
              (error: any) => {
                console.log(error);
              }
            )
            this.router.navigate(['/products'])
          },
          (error: any) => {
            //TODO 
            console.log(error);
          }
        );
        this.router.navigate(['/products'])
      },
      (error: any) => {
        //TODO 
        console.log("error")
        console.log(error);
      }
    );
  }
}
