import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/app/products/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  private usersEndpoint = '/orders';
  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}${this.usersEndpoint}`, order);
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}${this.usersEndpoint}`);
  }
  createNewCart(model:any) {
    return this.http.post(environment.baseApi + 'carts' , model )
  }
}
