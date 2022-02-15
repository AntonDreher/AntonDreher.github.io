import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { OrderedProduct } from '../model/orderedProduct';
import { OrderViewData } from '../model/orderViewData';
import { Product } from '../model/product';
import { ProductListService } from '../product-list/product-list-service';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  orders: OrderViewData[] = []; 
  selecetedOrderProducts?: OrderedProduct[];
  products: Product[] = [];
  private productList: Product[] = [];

  constructor(private cartService: CartService, private auth: AuthorizationService, private prodServ: ProductListService) { 
    this.updateProductList();
  }

  ngOnInit(): void {
    this.getOrders();
    //this.getProds();
  }

  /*getProds() {
    this.products = this.cartService.getProducts();
  }*/

  private updateProductList() {
    this.prodServ.getProductList().subscribe(
      (productList: Product[]) => {
        this.productList = productList;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onselect(order: OrderViewData) {
    console.log(order.oid);
    this.cartService.getProductsFromOrder(order.oid).subscribe(
      (selecetedOrderProducts: OrderedProduct[]) => {
        this.selecetedOrderProducts = selecetedOrderProducts;
        this.selecetedOrderProducts.forEach(prod => {
          console.log(this.products.length);
          this.productList.forEach(product => {
            
            if(prod.product_id == product.product_id.toString()) {
              prod.title = product.title;
              console.log(product.title);
            }
          })
        })
        console.log("prods: " + this.selecetedOrderProducts.length);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getOrders() {
    this.cartService.getOrdersByTableID(this.auth.getDecodedAccessToken().name).subscribe(
      (orders: OrderViewData[]) => {
        this.orders = orders;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /*private updateProductList() {
    this.productListService.getProductList().subscribe(
      (productList: Product[]) => {
        this.productList = productList;
      },
      (error) => {
        console.log(error)
      }
    )
  }*/

}
