 import { User } from 'src/app/login/model/user.model';
import { Product } from './product';

export interface Order {
  id: number;
  user: User;
  products: Product[];
  totalAmount: number;
  status: string;
  orderDate: Date;  
 }
