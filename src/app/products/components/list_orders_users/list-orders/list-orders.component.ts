import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { Role, User } from 'src/app/login/model/user.model';
import { Order } from 'src/app/products/models/order';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{
  success:boolean = false;
  orders: Order[] = [];
  successAlert:boolean = false;
id:number=0;
   currentUser: User = {
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
   constructor(private orderService: CartsService) {}
   openPaymentModal(orderId: number): void {
    // Vous pouvez faire quelque chose avec orderId ici
    // Par exemple, stocker l'ID dans une variable pour utilisation ultérieure ou déclencher des actions supplémentaires
    console.log('Order ID to pay:', orderId);
this.id=orderId;
  }
   saveData(form: any) {
    
    // Handle form submission logic here
    // For example, you can access form values using form.value
    console.log(form.value); // Log form values for demonstration
    
    this.openPaymentModal; 
    this.payForOrder(this.id);


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

   ngOnInit() {
    this.getUserFromLocalStorage();
    if (this.currentUser) {
      // Replace 'user_id_here' with the actual user ID
    this.getOrders(this.currentUser.id);
    }
   }


  getOrders(userId: number) {
    this.orderService.getOrdersByUser(userId).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
        // Gérer les erreurs de récupération des commandes
      }
    );
  }
  
  payForOrder(orderId: number): void {
    this.orderService.PayementOrder(orderId).subscribe(
      () => {
        // Payment successful, perform any actions or handle success
         console.log('Payment successful!');
          // Masquer l'alerte après 3 secondes
          this.successAlert = true;
          setTimeout(() => {
            this.successAlert = false;
          }, 2000);
    
                // Rafraîchissez vos données après la validation, par exemple :
                this.getOrders(orderId);
              },
      (error) => {
        console.error('Payment error:', error);
        // Handle payment error
      }
    );
  }
  
}
