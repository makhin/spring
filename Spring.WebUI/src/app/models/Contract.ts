import {IContract} from './IContract';
export class Contract implements IContract {
  id: number;
  name: string;
  code: string;
  constructor (id: number, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
  }
}
