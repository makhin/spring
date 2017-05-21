import {IEntity} from './IEntity';

export class Hospital implements IEntity {
  id: number;
  parentId: number;
  name: string;
}
