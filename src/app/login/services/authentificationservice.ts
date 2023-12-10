import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = 'http://localhost:3000';
  private usersEndpoint = '/users';
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}${this.usersEndpoint}`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}${this.usersEndpoint}`);
  }

  register(user:User): Observable<User> {
     return this.http.post<any>(`${this.apiUrl}${this.usersEndpoint}`, user);
  }

  // Fonction pour vérifier si l'utilisateur existe en fonction du numéro de téléphone et du mot de passe
  login(email: string, numTelephone: string): Observable<boolean> {
    console.log(numTelephone);
    return this.getUsers().pipe(
        map((users: User[]) => {
            const userFound = users.find(user => user.email === email && user.numTelephone === numTelephone);
             if (userFound) {
                // Enregistrer l'utilisateur connecté dans le stockage local
                localStorage.setItem('currentUser', JSON.stringify(userFound));
              }
            return !!userFound; // Renvoie true si l'utilisateur est trouvé, sinon false
        })
    );
}

  

  // Nouvelle fonction pour récupérer un utilisateur par email ou numéro de téléphone
  getUserByEmailOrPhone(email: string, numTel: string):  Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}${this.usersEndpoint}?email=${email}&numTelephone=${numTel}`);
  }
  
  
   
}
