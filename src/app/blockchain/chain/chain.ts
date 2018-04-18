import { Block } from '../block/block';
export class Chain {
  public blocks: Block[];
  constructor() {
    this.blocks = new Array<Block>();
  }
}
