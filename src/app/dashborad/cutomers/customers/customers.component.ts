import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/services/authentificationservice';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  users: any[] = []; // Changez le type pour correspondre à votre modèle d'utilisateur

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data; // Mettez à jour la liste des utilisateurs avec les données reçues du service
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        // Gérez les erreurs de récupération des utilisateurs
      }
    );
  }

}
