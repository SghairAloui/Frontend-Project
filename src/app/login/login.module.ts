import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './components/login/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthentificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule  

  ]
})
export class LoginModule { }
