import { Component } from '@angular/core';
import { AuthService } from '../../services/authentificationservice';
import { Role, User } from '../../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  loginForm: FormGroup;

    newUser: User = {
    id:0,
    nom: ' ',
    prenom: ' ',
    address: ' ',
    numTelephone: ' ',
    role:Role.CLIENT,
          email: ' '
  };
  
 
// Définir un FormGroup avec les validateurs nécessaires

 
constructor(private authService: AuthService ,private formBuilder: FormBuilder) {
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
           // Gérer la connexion réussie
      } 
      else {
          console.log('Échec de connexion', emailValue);
          // Gérer l'échec de connexion
      }
    
     });
    } else {
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