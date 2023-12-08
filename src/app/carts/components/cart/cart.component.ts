import { Component , OnInit  } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { user } from '../../models/user';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public user : user = new user();

  /*paymentForm: FormGroup;
  /*showSuccessMessage: boolean = true;
  showFailureMessage: boolean = false;*/

  
  successs = false;
  CartProducts : any[]=[]
  total : any = 0
  success:boolean = false

  constructor(private service:CartsService , private fb: FormBuilder){

    /*this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]]
    });*/
    

  }
  

  ngOnInit(): void {
  this.getCartProducts()
    

}

getCartProducts(){

  if("cart" in localStorage){
    this.CartProducts = JSON.parse(localStorage.getItem("cart")!)

}
this.getCartTotal()


}

getCartTotal() {
  this.total = 0
  for(let x in this.CartProducts) {
    this.total += this.CartProducts[x].item.price * this.CartProducts[x].quantity;
  }
}

addAmount(index:number) {
  this.CartProducts[index].quantity++
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.CartProducts))
}
minsAmount(index:number) {
  this.CartProducts[index].quantity--
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.CartProducts))
}

detectChange() {
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.CartProducts))
}

deleteProduct(index:number) {
  this.CartProducts.splice(index , 1)
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.CartProducts))
}

clearCart() {
  this.CartProducts = []
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.CartProducts))
}

addCart() {
  let products = this.CartProducts.map(item => {
   return {productId:item.item.id , quantity:item.quantity}
  })

   let Model = {
     userId:5,
     date: new Date(),
     products:products
   }

   this.service.createNewCart(Model).subscribe(res => {
     this.success = true
   })

   console.log(Model)
 }

 public saveData(registreForm: NgForm){
  console.log('valeurs: ' , JSON.stringify(registreForm.value));
  console.log(registreForm.form); 

 }
 

  showSuccessMessagee(): void {
    this.successs = true;
    /*if (this.paymentForm.valid) {
      // Simulate a successful submission
      this.showSuccessMessage = true;
      this.showFailureMessage = false;
    } else {
      // Simulate a failed submission
      this.showSuccessMessage = false;
      this.showFailureMessage = true;
    }
  }*/
  }}
