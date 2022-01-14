import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthGuard } from './helper/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { PayComponent } from './pay/pay.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'pay', component: PayComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: AuthorizationComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
