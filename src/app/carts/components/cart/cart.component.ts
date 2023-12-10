import { Component , OnInit  } from '@angular/core';
import { CartsService } from '../../services/carts.service';
 import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Role, User } from 'src/app/login/model/user.model';
import { Order } from 'src/app/products/models/order';
import { Product } from 'src/app/products/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  currentUser: User | null = null; // Déclarez la propriété currentUser
  newUser: User = {
    id:0,
    nom: ' ',
    prenom: ' ',
    address: ' ',
    numTelephone: ' ',
    role:Role.CLIENT,
          email: ' ',
          cardNumber:0,
          expiryDate:0,
          cvv:0
  };
 
 
  /*paymentForm: FormGroup;
  /*showSuccessMessage: boolean = true;
  showFailureMessage: boolean = false;*/

  
  successs = false;
  CartProducts : any[]=[]
  total : any = 0
  success:boolean = false
  saveUserToLocalStorage(newUser: User) {
    const userJSON = JSON.stringify(newUser);
    localStorage.setItem('currentUser', userJSON);
  }

  getUserFromLocalStorage() {
    const storedUserJSON = localStorage.getItem('currentUser');

    if (storedUserJSON !== null) {
      const currentUser = JSON.parse(storedUserJSON);
      this.currentUser = currentUser; // Affectez l'utilisateur actuel à la propriété de votre composant
      console.log('Current User:', currentUser);
    } else {
      console.log('No user data found');
    }
  }
   
  constructor(private service:CartsService , private fb: FormBuilder){
  

    /*this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]]
    });*/
    

  }
  

  ngOnInit(): void {
    this.getUserFromLocalStorage(); 
  this.getCartProducts()
    

}

getCartProducts(){

  if("cart" in localStorage){
    this.CartProducts = JSON.parse(localStorage.getItem("cart")!)
    console.log(this.CartProducts);
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
  console.log(this.CartProducts);
  console.log(this.currentUser);
   let products: Product[] = this.CartProducts.map(item => {
     return {
      id: item.item.id, // Replace with the correct property names from your 'item'
      title:  item.item.title, // Replace with the appropriate value from 'item'
      price: item.item.price, // Replace with the appropriate value from 'item'
      category:  item.item.category,
      description: item.item.description,
      image:  item.item.image,
      quantite:item.quantity
       
    };
  }) 

  if (this.currentUser) {
    const order = new Order(
        this.currentUser,
        products,
       this.total,  
        'Pending', // Statut initial de la commande
        new Date()  
       );
       console.log(order);
       this.service.createNewCart(order).subscribe(res => {
        this.success = true
      })
 
    this.service.saveOrder(order).subscribe(
      (response) => {
        this.success = true

        console.log('Commande enregistrée avec succès', response);
        // Gérer la réponse ou le comportement après l'enregistrement
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la commande', error);
        // Gérer les erreurs enregistrées lors de la sauvegarde
      }
    );
  }



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
