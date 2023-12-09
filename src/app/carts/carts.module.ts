import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,SharedModule,FormsModule,LoginModule
  ]
})
export class CartsModule { }
