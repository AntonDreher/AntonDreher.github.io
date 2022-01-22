import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Input } from '@angular/core';
import { CartService } from '../shopping-cart/cart.service';
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
  productWasLiked: boolean = false;
  productWasDisliked: boolean = false;
  constructor(private cartService: CartService, private productService: ProductService, private sanitizer: DomSanitizer) {
  }

  addToCart(prodToAdd: Product): void {
    this.cartService.addItem(prodToAdd, this.imageURL);
  }

  private putLikeToProduct() {
    this.productService.putLikeToProduct(this.currentProduct.product_id).subscribe(
      () => {
        this.productService.getNumberOfLikesFromProduct(this.currentProduct.product_id).subscribe(
          (response) => {
            this.currentProduct.number_of_likes = response[0]['number_of_likes'];
            this.productWasLiked = true;
          })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private removeLikeFromProduct() {
    this.productService.removeLikeFromProduct(this.currentProduct.product_id).subscribe(
      () => {
        this.productService.getNumberOfLikesFromProduct(this.currentProduct.product_id).subscribe(
          (response) => {
            this.currentProduct.number_of_likes = response[0]['number_of_likes'];
            this.productWasLiked = false;
          })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private putDislikeToProduct() {
    this.productService.putDislikeToProduct(this.currentProduct.product_id).subscribe(
      () => {
        this.productService.getNumberOfDislikesFromProduct(this.currentProduct.product_id).subscribe(
          (response) => {
            this.currentProduct.number_of_dislikes = response[0]['number_of_dislikes'];
            this.productWasDisliked = true;
          })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private removeDislikeFromProduct() {
    this.productService.removeDislikeFromProduct(this.currentProduct.product_id).subscribe(
      () => {
        this.productService.getNumberOfDislikesFromProduct(this.currentProduct.product_id).subscribe(
          (response) => {
            this.currentProduct.number_of_dislikes = response[0]['number_of_dislikes'];
            this.productWasDisliked = false;
          })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  likeProduct(): void {
    if (this.productWasDisliked) {
      this.removeDislikeFromProduct();
      this.putLikeToProduct();
    } else if (this.productWasLiked) {
      this.removeLikeFromProduct();
    } else {
      this.putLikeToProduct();
    }
  }

  dislikeProduct(): void {
    if (this.productWasLiked) {
      this.removeLikeFromProduct();
      this.putDislikeToProduct();
    } else if (this.productWasDisliked) {
      this.removeDislikeFromProduct();
    } else {
      this.putDislikeToProduct();
    }
  }
  private fillAllergens() {
    this.productService.getAllergenesFromProduct(this.currentProduct.product_id).subscribe(
      (response) => {
        this.currentProduct.allergenes = [];
        for (let i = 0; i < response.length; i++) {
          this.currentProduct.allergenes.push(response[i]['allergene_code']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
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

  private checkIfProductWasLiked() {
    this.productService.getProductWasLikedFromSession(this.currentProduct.product_id).subscribe(
      (response: boolean) => {
        this.productWasLiked = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private checkIfProductWasDisliked() {
    this.productService.getProductWasDislikedFromSession(this.currentProduct.product_id).subscribe(
      (response: boolean) => {
        this.productWasDisliked = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.fillImage();
    this.fillAllergens();
    this.checkIfProductWasLiked();
    this.checkIfProductWasDisliked();
  }

}
