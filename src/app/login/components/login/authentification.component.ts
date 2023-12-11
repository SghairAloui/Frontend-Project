import { Component } from '@angular/core';
import { AuthService } from '../../services/authentificationservice';
import { Role, User } from '../../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  loginForm: FormGroup;
  isLoginSuccess = false; // Variable pour déterminer si l'alerte de connexion réussie doit être affichée

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
  
 
// Définir un FormGroup avec les validateurs nécessaires

 
constructor(private router: Router,private authService: AuthService ,private formBuilder: FormBuilder) {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}
  onSubmit() { 
    if (this.loginForm.valid) {
      const emailValue = this.loginForm.get('email')?.value;
    const passwordvalue =this.loginForm.get('password')?.value
      console.log('Formulaire valide. Email:',emailValue,passwordvalue);
 
    this.authService.login(emailValue, passwordvalue)
    .subscribe((isAuthenticated) => {
      if (isAuthenticated) {
          console.log('Connexion réussie', emailValue);
          this.isLoginSuccess = true; // Activer l'alerte de connexion réussie

          alert('Connexion réussie ! Redirection vers la page d\'accueil.');
          this.authService.getUserByEmailOrPhone(emailValue, passwordvalue).subscribe((data: User[]) => {
              
                if (data && data.length > 0) {
                   console.log('User:', data[0]); // Affiche l'objet utilisateur
                  console.log('User ID:', data[0].id); // Accédez à la propriété 'id' de l'objet utilisateur
              
                  localStorage.setItem('currentUser', JSON.stringify(data[0])); // Enregistrez l'utilisateur connecté dans le stockage local

          
            
             console.log("role" , data[0].role);

            if (data[0].role== "admin") {
              this.router.navigate(['/admin']); // Assurez-vous d'avoir défini la route vers la page Home
            }
             else  {
                    this.router.navigate(['/home']); // Rediriger vers la page d'administration pour le rôle admin
            } 
          }
           // Gérer la connexion réussie
          });
        }
      
    
      
    
    else {
      alert('Échec de connexion'!    );

      console.log('Échec de connexion', emailValue);
           }});

          }
     else {
      console.log('Veuillez remplir correctement le formulaire.');
    }
  }
  
  
  
  

  register( ) {
    this.authService.register(this.newUser)
      .subscribe(
        (response) => {
          // Gérer la réponse du service d'authentification
        },
        (error) => {
          // Gérer les erreurs éventuelles
        }
      );
  }
  
  toggleContainerClass(action: 'login' | 'register') {
    const container = document.getElementById('container');
  
    if (container) {
      if (action === 'login') {
        container.classList.remove('active');
      } else {
        container.classList.add('active');
      }
    }
}

}