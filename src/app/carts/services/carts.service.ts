import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/app/products/models/order';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';
import * as emailjs from 'emailjs-com';

 
@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  private ordersEndpoint = '/orders';
  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}${this.ordersEndpoint}`, order);
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}${this.ordersEndpoint}`);
  }
  getOrdersByUser(userId: number): Observable<Order[]> {
    const userOrdersEndpoint = `/orders/${userId}${this.ordersEndpoint}`;
    return this.http.get<Order[]>(`${this.apiUrl}${userOrdersEndpoint}`);
  }
  createNewCart(model:any) {
    return this.http.post(environment.baseApi + 'carts' , model )
  }
  deleteOrder(orderId: number): Observable<Order> {
    const url = `${this.apiUrl}${this.ordersEndpoint}/${orderId}`;
    return this.http.delete<Order>(url);
  }
  updateOrder(orderId: number, updatedOrder: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${this.ordersEndpoint}/${orderId}`, updatedOrder);
  }
  validateOrder(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.ordersEndpoint}/${orderId}`).pipe(
      mergeMap((order: any) => {
        order.status = 'Valide'; // Mettez à jour le statut
        return this.http.put<any>(`${this.apiUrl}${this.ordersEndpoint}/${orderId}`, order);
      }),
      mergeMap((updatedOrder: any) => {
        return this.sendEmail("aloui.sghair@gmail.com"); // Appel à la fonction d'envoi d'e-mail avec l'e-mail de l'utilisateur
      })
    );
  }
  PayementOrder(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.ordersEndpoint}/${orderId}`).pipe(
      mergeMap((order: any) => {
        order.status = 'Paye'; // Change the status to 'Payé'
        return this.http.put<any>(`${this.apiUrl}${this.ordersEndpoint}/${orderId}`, order);
      }),
      
    );
  }
  

  // Fonction factice d'envoi d'e-mail (simule l'envoi d'un e-mail à l'utilisateur)
  // Exemple d'envoi d'un e-mail avec emailjs
sendEmail(email:string): Observable<emailjs.EmailJSResponseStatus> { {
  const templateParams = {
    to_name: 'Med ALoui SGHAIR',
    from_name: 'Student_Commerce',
    message: 'Your Order is validate Successfly ',
    from_email: "aloui.sghair@gmail.com",
    to_email: email

  };
  emailjs.init("kgkaJBqi5RuaFPM1X");
  return new Observable<emailjs.EmailJSResponseStatus>((observer) => {

  emailjs.send("service_cs74wu6", "template_8087hw9", templateParams)
  .then((response: emailjs.EmailJSResponseStatus) => {
    console.log('E-mail sent successfully!', response);
    observer.next(response);
    observer.complete();
  }, (error: any) => {
    console.error('Error sending e-mail:', error);
    observer.error(error);
  });
});
}
}
  

 
}