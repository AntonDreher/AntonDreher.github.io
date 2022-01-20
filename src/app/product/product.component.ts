import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../model/product';
import { Input } from '@angular/core';
import { CartService } from '../shopping-cart/cart.service';
import { ProductService } from './product-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() currentProduct: Product;
  @Output() productLiked = new EventEmitter<{ product_id: number }>();
  imageURL: SafeUrl;
  constructor(private cartService: CartService, private productService: ProductService, private sanitizer: DomSanitizer) {
  }

  addToCart(prodToAdd: Product): void {
    this.cartService.addItem(prodToAdd, this.imageURL);
  }

  likeProduct(): void {
    this.productLiked.emit({ product_id: this.currentProduct.product_id });
  }

  private fillImage() {
    this.productService.getImageFromProduct(this.currentProduct.product_id).subscribe(
      (blob: Blob) => {
        let unsafeImageURL: string = URL.createObjectURL(blob);
        this.imageURL = this.sanitizer.bypassSecurityTrustUrl(unsafeImageURL);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.fillImage();
  }

}
