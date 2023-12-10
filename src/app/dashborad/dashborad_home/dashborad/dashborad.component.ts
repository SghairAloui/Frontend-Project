import { Component } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { Order } from 'src/app/products/models/order';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent {
  success:boolean = false

goToUsersList() {
  this.router.navigate(['/users']);
 }
  orders: Order[] = [];
 
  constructor(private router: Router,private orderService: CartsService) {}

  ngOnInit() {
    this.getOrders();
  }
  logout(): void {
    // Ici, vous pouvez ajouter la logique de déconnexion, comme la suppression du token d'authentification, etc.
    // Après la déconnexion, naviguez vers la page de connexion ou une autre page appropriée.
    this.router.navigate(['/login']); // Remplacez '/login' par le chemin de votre page de connexion
  }


  confirmDeleteOrder(orderId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.deleteOrder(orderId);
    }
  }


  cancelDelete(orderId: number): void {
    const confirmationAlertId = 'confirmationAlert' + orderId;
    const confirmationAlert = document.getElementById(confirmationAlertId);
    if (confirmationAlert) {
      confirmationAlert.style.display = 'none';
    }
  }deleteOrder(orderId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          console.log('La commande a été supprimée avec succès.');
          // Rafraîchissez vos données après la suppression, par exemple :
          this.getOrders();
        },
        error => {
          console.error('Erreur lors de la suppression de la commande :', error);
          alert('Une erreur est survenue lors de la suppression de la commande.');
        }
      );
    }
  }
  validateOrder(orderId: number): void {
    this.orderService.validateOrder(orderId).subscribe(
      () => {
        console.log('La commande a été validée avec succès.');
        this.success = true
 // Masquer l'alerte après 3 secondes
 setTimeout(() => {
  this.success = false;
}, 2000);
        // Rafraîchissez vos données après la validation, par exemple :
        this.getOrders();
      },
      error => {
        console.error('Erreur lors de la validation de la commande :', error);
        alert('Une erreur est survenue lors de la validation de la commande.');
      }
    );
  }
 
  getOrders() {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
        // Gérer les erreurs de récupération des commandes
      }
    );
  }
  // Afficher l'alerte de suppression réussie après la suppression
  showDeleteAlert(orderId: number): void {
    const deleteAlertId = 'deleteAlert' + orderId;
    const deleteAlert = document.getElementById(deleteAlertId);
    if (deleteAlert) {
      deleteAlert.style.display = 'block';
      // Cachez la boîte de confirmation après la suppression
      this.cancelDelete(orderId);
      // Cachez l'alerte après un certain délai
      setTimeout(() => {
        deleteAlert.style.display = 'none';
      }, 3000); // Temps en millisecondes avant de cacher l'alerte
    }
  }
}
