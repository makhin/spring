import { IEntity } from './IEntity'
export class ContractItem implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}
