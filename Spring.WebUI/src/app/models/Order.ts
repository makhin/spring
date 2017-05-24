import {IEntity} from './IEntity';

export class Order implements IEntity {
  id: number;
  recipeNumber: string;
  orderNumber: string;
  recipeDate: Date;
  orderDate: Date;
  amount: number;
  pharmacy:string;
}
