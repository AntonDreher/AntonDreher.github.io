import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Input } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() currentProduct: Product | undefined;
  constructor(private cartService: CartService) { }

  addToCart(prodToAdd: Product) :void {
    //TODO
    this.cartService.addItem(prodToAdd);
  }

  likeProduct(prod: Product) :void {
    //todo
  }
  ngOnInit(): void {
  }

}
