import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';
import { CartItem } from '../model/cartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products :CartItem[] = [];
  constructor(
    private route: ActivatedRoute,
    private Location: Location,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    //this.products = this.cartService.getItems();
    this.cartService.getItems().subscribe(products => this.products = products);
  }

  getTotalPrice() :number {
    return this.cartService.calculateTotalPrice();
  }

  pay() :void {
    
  }


  goBack(): void {
    this.Location.back();
  }

}
