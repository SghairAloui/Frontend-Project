import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboradComponent } from './dashborad_home/dashborad/dashborad.component';
import { CartsModule } from '../carts/carts.module';
import { CustomersComponent } from './cutomers/customers/customers.component';



@NgModule({
  declarations: [
    DashboradComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    CartsModule
  ]
})
export class DashboradModule { }
