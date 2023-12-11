import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListOrdersComponent } from './components/list_orders_users/list-orders/list-orders.component';




@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
    ListOrdersComponent
  ],
  imports: [
    CommonModule,SharedModule,RouterModule,FormsModule
  ]
})
export class ProductsModule { }
