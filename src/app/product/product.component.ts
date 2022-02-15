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

  /**@method*/
  /* adds a specific product to the cart
   */
  addToCart(prodToAdd: Product): void {
    this.cartService.addItem(prodToAdd, this.imageURL);
  }

  /**@method */
  /**adds a like to a specific product, and updates the view  */
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

  /**@method */
  /**unlike a product (not dislike), like is removed in the backend and then the view is updated */
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
  /**@method */
  /**adds a dislike to a specific product, and updates the view  */
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
  /**@method */
  /**undislike a product (not like), dislike is removed in the backend and then the view is updated */
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
  /**@method */
  /**if the like button is clicked there are three possible scenarios:
   * 1. the product was already disliked (then remove the dislike and add a like)
   * 2. the product was already liked (then remove the like)
   * 3. nothing has happened before (add the like to the product)
   */
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
  /**@method */
  /**if the dislike button is clicked there are three possible scenarios:
   * 1. the product was already liked (then remove the like and add a dislike)
   * 2. the product was already disliked (then remove the dislike)
   * 3. nothing has happened before (add the dislike to the product)
   */
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

  /**@method */
  /**gets the allergenes for a specific product */
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

  /**@method */
  /**gets an image for the product from the backend, and assigns it to the matching product */
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

  /**@method */
  /**checks in the backend if a product was already liked by the current session */
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
  /**@method */
  /**checks in the backend if a product was already disliked by the current session */
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
