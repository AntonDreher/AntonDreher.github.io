import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationService } from './authorization/authorization.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helper/authconfig.interceptor';
import { CheckoutComponent } from './checkout/checkout.component';
import { PayComponent } from './pay/pay.component';
import { ProductListService } from './product-list/product-list-service';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListService } from './category-list/category-list-service';
import { ProductService } from './product/product-service';
import { OrderViewComponent } from './order-view/order-view.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewService } from './review-form/review.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    ShoppingCartComponent,
    AuthorizationComponent,
    CheckoutComponent,
    PayComponent,
    CategoryComponent,
    CategoryListComponent,
    OrderViewComponent,
    ReviewFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ProductListService,
    CategoryListService,
    ProductService,
    ReviewService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
