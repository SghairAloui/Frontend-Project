import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/authentificationservice';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  users: any[] = []; // Changez le type pour correspondre à votre modèle d'utilisateur

  constructor(private router: Router,private userService: AuthService) { }
  logout(): void {
    // Ici, vous pouvez ajouter la logique de déconnexion, comme la suppression du token d'authentification, etc.
    // Après la déconnexion, naviguez vers la page de connexion ou une autre page appropriée.
    this.router.navigate(['/login']); // Remplacez '/login' par le chemin de votre page de connexion
  }
  order(): void {
    // Ici, vous pouvez ajouter la logique de déconnexion, comme la suppression du token d'authentification, etc.
    // Après la déconnexion, naviguez vers la page de connexion ou une autre page appropriée.
    this.router.navigate(['/admin']); // Remplacez '/login' par le chemin de votre page de connexion
  }

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
