import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Input } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from './product-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() currentProduct: Product;
  imageURL: SafeUrl;
  constructor(private cartService: CartService, private productService: ProductService, private sanitizer: DomSanitizer) {
  }

  addToCart(prodToAdd: Product): void {
    //TODO
    this.cartService.addItem(prodToAdd);
  }

  likeProduct(prod: Product): void {
    //todo
  }

  private fillImage() {
    this.productService.getImageFromProduct(this.currentProduct.product_id).subscribe(
      (blob: Blob) => {
        console.log(blob);
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
