export class user{
     public cardNumber: number |null;
     public expiryDate: number | null;
     public cvv: number | null;

     constructor() {
        this.cardNumber = null; // or initialize with the appropriate default value
        this.expiryDate = null; // or initialize with the appropriate default value
        this.cvv = null; // or initialize with the appropriate default value
      }
}