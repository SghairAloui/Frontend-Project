import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { HomeComponent } from './home/components/home/home.component';
import { AuthentificationComponent } from './login/components/login/authentification.component';
import { DashboradComponent } from './dashborad/dashborad_home/dashborad/dashborad.component';
import { CustomersComponent } from './dashborad/cutomers/customers/customers.component';
import { ListOrdersComponent } from './products/components/list_orders_users/list-orders/list-orders.component';

const routes: Routes = [
  { path: 'products', component: AllProductsComponent },
  { path: 'admin', component: DashboradComponent },
  { path: 'details/:id', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'users', component: CustomersComponent },
  { path: 'listorders', component: ListOrdersComponent },

  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut vers login
  { path: 'login', component: AuthentificationComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirection pour tout autre chemin non défini
];

export default routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
