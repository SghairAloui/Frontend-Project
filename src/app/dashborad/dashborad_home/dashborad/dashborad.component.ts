import { Component } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { Order } from 'src/app/products/models/order';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent {
  orders: Order[] = [];

  constructor(private orderService: CartsService) {}

  ngOnInit() {
    this.getOrders();
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
}
