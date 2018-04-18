import { Block } from '../block/block';
export class Chain {
  private genesisBlock: Block;
  private currentBlock: Block;
  private _blocks: Block[];
  public get blocks(): Block[] {
    return this._blocks;
  }
  constructor() {
    this._blocks = new Array<Block>();
  }
  public acceptBlock(block: Block): void {
    if (!this.genesisBlock) {
      this.genesisBlock = block;
    }
    block.chainWith(this.currentBlock);
    this.currentBlock = block;
    this._blocks.push(block);
  }
}
