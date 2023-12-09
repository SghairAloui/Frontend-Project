export enum Role {
    CLIENT = 'client',
    ADMIN = 'admin',
    LIVREUR = 'livreur'
  }
  
  export interface User {
    id:number;
    nom: string;
    prenom: string;
    address: string;
    numTelephone: string;
    role: Role; // Utilisation de l'enum Role pour le champ role
    email: string;
  }
  